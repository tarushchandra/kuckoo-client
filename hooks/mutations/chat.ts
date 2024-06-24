import { Chat, CreateMessagePayload, Message } from "@/gql/graphql";
import {
  addGroupAdminMutation,
  addMembersToGroupMutation,
  createGroupMutation,
  createMessageMutation,
  leaveGroupMutation,
  removeGroupAdminMutation,
  removeMemberFromGroupMutation,
  renameGroupMutation,
} from "@/graphql/mutations/chat";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
        queryKey: ["chat-history", variables.payload.chatId],
      });
      await queryClient.cancelQueries({ queryKey: ["chats"] });

      const previousChats: any = queryClient.getQueryData(["chats"]);
      let previousChatHistory: any = null;
      // console.log("previousChats -", previousChats);

      if (variables.payload.chatId) {
        previousChatHistory = queryClient.getQueryData([
          "chat-history",
          variables.payload.chatId,
        ]);
        console.log("previousChatHistory -", previousChatHistory);

        queryClient.setQueryData(
          ["chat-history", variables.payload.chatId],
          (prev: any) => {
            // console.log("prev -", prev);

            const messageCreatedDate = new Date(
              Number(variables.message.createdAt)
            ).toDateString();
            console.log("messageCreatedDate -", messageCreatedDate);

            const currentChatHistory = prev.getChatHistory.find(
              (x: any) => x.date === messageCreatedDate
            );

            if (!currentChatHistory) {
              prev.getChatHistory.unshift({
                date: messageCreatedDate,
                messages: [variables.message],
                activities: [],
              });
            } else {
              currentChatHistory.messages.unshift(variables.message);
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
      return { previousChatHistory, previousChats };
    },
    onError: (err, variables, context: any) => {
      if (context.previousChatHistory)
        queryClient.setQueryData(
          ["chat-history", variables.payload.chatId],
          context.previousChatHistory
        );
      queryClient.setQueryData(["chats"], context.previousChats);
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
          queryKey: ["chat-history", variables.payload.chatId],
        });
    },
  });
};

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: (variables: { name: string; targetUserIds: string[] }) =>
      graphqlClient.request(createGroupMutation, {
        name: variables.name,
        targetUserIds: variables.targetUserIds,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: async (error: any) => {},
  });
};

export const useRenameGroup = () => {
  return useMutation({
    mutationFn: (variables: { chatId: string; name: string }) =>
      graphqlClient.request(renameGroupMutation, {
        chatId: variables.chatId,
        name: variables.name,
      }),
    onSuccess: (data, variables) =>
      queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.chatId],
      }),
  });
};

export const useAddMembersToGroup = (
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>
) => {
  return useMutation({
    mutationFn: (variables: { chatId: string; targetUserIds: string[] }) =>
      graphqlClient.request(addMembersToGroupMutation, {
        chatId: variables.chatId,
        targetUserIds: variables.targetUserIds,
      }),
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-members", variables.chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.chatId],
      });

      const currentChats: any = queryClient.getQueryData(["chats"]);
      const mutatedChat = currentChats.getChats.filter(
        (x: any) => x.id === variables.chatId
      );

      setSelectedChat(mutatedChat[0]);
    },
    onError: async (error: any) => {},
  });
};

export const useRemoveMemberFromGroup = () => {
  return useMutation({
    mutationFn: (variables: { chatId: string; targetUserId: string }) =>
      graphqlClient.request(removeMemberFromGroupMutation, {
        chatId: variables.chatId,
        targetUserId: variables.targetUserId,
      }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-members", variables.chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
};

export const useAddGroupAdmin = () => {
  return useMutation({
    mutationFn: (variables: { chatId: string; targetUserId: string }) =>
      graphqlClient.request(addGroupAdminMutation, {
        chatId: variables.chatId,
        targetUserId: variables.targetUserId,
      }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-members", variables.chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
};

export const useRemoveGroupAdmin = () => {
  return useMutation({
    mutationFn: (variables: { chatId: string; targetUserId: string }) =>
      graphqlClient.request(removeGroupAdminMutation, {
        chatId: variables.chatId,
        targetUserId: variables.targetUserId,
      }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-members", variables.chatId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
};

export const useLeaveGroup = () => {
  return useMutation({
    mutationFn: (variables: { chatId: string; targetUserId: string }) =>
      graphqlClient.request(leaveGroupMutation, {
        chatId: variables.chatId,
      }),

    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.chatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["chat-members", variables.chatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
};
