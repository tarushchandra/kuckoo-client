import { Chat, CreateMessagePayload, Message } from "@/gql/graphql";
import { createMessageMutation } from "@/graphql/mutations/chat";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";

interface SendMessage {
  payload: CreateMessagePayload;
  message: Message;
  selectedChat: Chat;
}

interface onMessageMutation {
  onSuccess: () => void;
  onError: () => void;
}

export const useSendMessage = (onMessageMutation: onMessageMutation) => {
  return useMutation({
    mutationFn: (variables: SendMessage) =>
      graphqlClient.request(createMessageMutation, {
        payload: variables.payload,
      }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["chat-messages", variables.payload.chatId],
      });
      await queryClient.cancelQueries({ queryKey: ["chats"] });

      // console.log("message payload -", variables.message);
      // console.log("chat payload -", variables.selectedChat);

      const previousChatMessages = queryClient.getQueryData([
        "chat-messages",
        variables.payload.chatId,
      ]);
      // console.log("previousChatMessages -", previousChatMessages);

      const previousChats: any = queryClient.getQueryData(["chats"]);
      // console.log("previousChats -", previousChats);

      queryClient.setQueryData(
        ["chat-messages", variables.payload.chatId],
        (prev: any) => {
          // console.log("prev -", prev);

          const messageCreatedDate = new Date(
            Number(variables.message.createdAt)
          ).toDateString();
          // console.log("messageCreatedDate -", messageCreatedDate);

          const groupedMessages = prev.getChatMessages.find(
            (x: any) => x.date === messageCreatedDate
          );

          if (!groupedMessages) {
            prev.getChatMessages.unshift({
              date: messageCreatedDate,
              messages: [variables.message],
            });
          } else {
            groupedMessages.messages.unshift(variables.message);
          }
        }
      );

      queryClient.setQueryData(["chats"], (prev: any) => {
        const remainingChats = prev.getChats.filter(
          (x: any) => x.id !== variables.selectedChat.id
        );
        return { getChats: [variables.selectedChat, ...remainingChats] };
      });

      onMessageMutation.onSuccess();
      return { previousChatMessages, previousChats };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(
        ["chat-messages", variables.payload.chatId],
        context.previousChatMessages
      );
      queryClient.setQueryData(["chats"], context.previousChatMessages);
      onMessageMutation.onError();
    },
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.payload.chatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
};
