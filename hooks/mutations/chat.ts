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
  setMessagesAsSeenMutation,
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

      console.log("previousChats -", previousChats);

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
            // console.log("messageCreatedDate -", messageCreatedDate);

            const currentChatHistory = prev.getChatHistory.find(
              (x: any) => x.date === messageCreatedDate
            );

            if (!currentChatHistory) {
              prev.getChatHistory.unshift({
                date: messageCreatedDate,
                messages: {
                  unseenMessages: [variables.message],
                  seenMessages: [],
                  sessionUserMessages: [],
                },
                activities: [],
              });
            } else {
              currentChatHistory.messages.unseenMessages.unshift(
                variables.message
              );
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
    onSettled: (data, error, variables) => {
      console.log("data -", data);

      if (data?.createMessage?.chat)
        onMessageMutation.setSelectedChat((prev: any) => {
          console.log("previous selectedChat -", prev);
          return {
            ...prev,
            id: data.createMessage?.chat?.id!,
          };
        });
      else {
        // queryClient.invalidateQueries({
        //   queryKey: ["chat-history", variables.payload.chatId],
        // });

        queryClient.setQueryData(
          ["chat-history", variables.payload.chatId],
          (prev: any) => {
            const firstChatHistoryItem = prev.getChatHistory[0];
            const remainingChatHistoryItems = prev.getChatHistory.slice(1);

            return {
              getChatHistory: [
                {
                  ...firstChatHistoryItem,
                  messages: {
                    ...firstChatHistoryItem.messages,
                    unseenMessages: [],
                    seenMessages: [
                      ...firstChatHistoryItem.messages.unseenMessages.slice(1),
                      ...firstChatHistoryItem.messages.seenMessages,
                    ],
                    sessionUserMessages: [
                      firstChatHistoryItem.messages.unseenMessages[0].sender
                        .username === variables.message.sender?.username && {
                        ...firstChatHistoryItem.messages.unseenMessages[0],
                        seenBy: [],
                        id: data?.createMessage!.id,
                      },
                      ...firstChatHistoryItem.messages.sessionUserMessages,
                    ],
                  },
                },
                ...remainingChatHistoryItems,
              ],
            };
          }
        );
      }

      queryClient.invalidateQueries({
        queryKey: ["chats"],
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

export const useSetMessagesAsSeen = () => {
  return useMutation({
    mutationFn: (variables: { chatId: string; messageIds: string[] }) =>
      graphqlClient.request(setMessagesAsSeenMutation, {
        chatId: variables.chatId,
        messageIds: variables.messageIds,
      }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["unseen-chats-count"] });
      await queryClient.cancelQueries({ queryKey: ["chats"] });

      const previousUnseenChatsCount = queryClient.getQueryData([
        "unseen-chats-count",
      ]);
      const previousChats = queryClient.getQueryData(["chats"]);

      queryClient.setQueryData(["unseen-chats-count"], (prev: any) => {
        return { getUnseenChatsCount: prev.getUnseenChatsCount - 1 };
      });

      queryClient.setQueryData(["chats"], (prev: any) => {
        const previousChats = prev.getChats;

        const currentChats = previousChats.map((chat: any) => {
          if (chat.id === variables.chatId) {
            return { ...chat, unseenMessagesCount: 0 };
          }
          return chat;
        });

        return { getChats: currentChats };
      });

      return { previousUnseenChatsCount, previousChats };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(
        ["unseen-chats-count"],
        context.previousUnseenChatsCount
      );
      queryClient.setQueryData(["chats"], context.previousChats);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["chats"] });
    //   queryClient.invalidateQueries({ queryKey: ["unseen-chats-count"] });
    // },
  });
};
