import { Chat, CreateMessagePayload, Message, User } from "@/gql/graphql";
import {
  addGroupAdminMutation,
  addMembersToGroupMutation,
  createGroupMutation,
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
import { useAppDispatch } from "../redux";
import {
  addMembersToGroup,
  removeMemberFromGroup,
} from "@/lib/redux/features/chat/chatSlice";
import { useAuth } from "../auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";

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

export const useAddMembersToGroup = (selectedUsers: User[]) => {
  const dispatch = useAppDispatch();
  const { data: sessionUser } = useAuth(selectUser);

  return useMutation({
    mutationFn: (variables: { chatId: string; targetUserIds: string[] }) =>
      graphqlClient.request(addMembersToGroupMutation, {
        chatId: variables.chatId,
        targetUserIds: variables.targetUserIds,
      }),
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-members", variables.chatId],
      });

      dispatch(
        addMembersToGroup({
          chatId: variables.chatId,
          selectedUsers,
          sessionUser,
        })
      );
    },
    onError: async (error: any) => {},
  });
};

export const useRemoveMemberFromGroup = () => {
  const dispatch = useAppDispatch();
  const { data: sessionUser } = useAuth(selectUser);

  return useMutation({
    mutationFn: (variables: { chatId: string; targetUser: User }) =>
      graphqlClient.request(removeMemberFromGroupMutation, {
        chatId: variables.chatId,
        targetUserId: variables.targetUser.id,
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

      dispatch(
        removeMemberFromGroup({
          chatId: variables.chatId,
          sessionUser,
          targetUser: variables.targetUser,
        })
      );
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
