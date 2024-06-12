import { Chat, CreateMessagePayload, Message } from "@/gql/graphql";
import { createMessageMutation } from "@/graphql/mutations/chat";
import { getChatMessagesQuery } from "@/graphql/queries/chat";
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
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export const useSendMessage = (onMessageMutation: onMessageMutation) => {
  return useMutation({
    mutationFn: (variables: SendMessage) =>
      graphqlClient.request(createMessageMutation, {
        payload: variables.payload,
      }),
    onMutate: async (variables) => {
      console.log("variables -", variables);

      await queryClient.cancelQueries({
        queryKey: ["chat-messages", variables.payload.chatId],
      });
      await queryClient.cancelQueries({ queryKey: ["chats"] });

      const previousChats: any = queryClient.getQueryData(["chats"]);
      let previousChatMessages: any = null;
      // console.log("previousChats -", previousChats);

      if (variables.payload.chatId) {
        previousChatMessages = queryClient.getQueryData([
          "chat-messages",
          variables.payload.chatId,
        ]);
        // console.log("previousChatMessages -", previousChatMessages);

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
      } else {
        onMessageMutation.setSelectedChat((prev: any) => {
          console.log("previous selectedChat -", prev);
          return {
            ...prev,
            id: "default-chat-id",
            creator: {
              username: variables.message.sender?.username,
            },
            createdAt: Number(variables.message.createdAt),
            latestMessage: variables.message,
          };
        });
      }

      queryClient.setQueryData(["chats"], (prev: any) => {
        let remainingChats = prev.getChats;

        if (!variables.payload.chatId)
          return {
            getChats: [
              { ...variables.selectedChat, id: "default-chat-id" },
              ...remainingChats,
            ],
          };

        remainingChats = prev.getChats.filter(
          (x: any) => x.id !== variables.selectedChat.id
        );
        return {
          getChats: [variables.selectedChat, ...remainingChats],
        };
      });

      onMessageMutation.onSuccess();
      return { previousChatMessages, previousChats };
    },
    onError: (err, variables, context: any) => {
      if (context.previousChatMessages)
        queryClient.setQueryData(
          ["chat-messages", variables.payload.chatId],
          context.previousChatMessages
        );
      queryClient.setQueryData(["chats"], context.previousChatMessages);
      onMessageMutation.onError();
    },
    onSettled: async (data, error, variables) => {
      console.log("data -", data);

      await queryClient.invalidateQueries({
        queryKey: ["chats"],
      });

      if (data?.createMessage)
        onMessageMutation.setSelectedChat((prev: any) => {
          console.log("previous selectedChat -", prev);
          return {
            ...prev,
            id: data.createMessage?.id!,
          };
        });
      else
        await queryClient.invalidateQueries({
          queryKey: ["chat-messages", variables.payload.chatId],
        });
    },
  });
};
