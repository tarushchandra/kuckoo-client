import { Chat, ChatHistory } from "@/gql/graphql";
import {
  getAvailableMembersQuery,
  getChatHistoryQuery,
  getChatMembersQuery,
  getChatsQuery,
  getPeopleWithMessageSeenQuery,
  getUnseenChatsCountQuery,
} from "@/graphql/queries/chat";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/react-query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export const useChats = () => {
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: () => graphqlClient.request(getChatsQuery),
  });
  return data?.getChats;
};

export const useChatHistory = (chat: Chat) => {
  const { data } = useQuery({
    queryKey: ["chat-history", chat.id],
    queryFn: () => {
      if (!chat.id) return;
      return graphqlClient.request(getChatHistoryQuery, { chatId: chat.id });
    },
  });

  const cacheRef = useRef<ChatHistory[] | null>(null);

  useEffect(() => {
    if (chat.id === "default-chat-id") return;
    cacheRef.current = null;
  }, [chat.id]);

  if (cacheRef.current) return cacheRef.current;

  if (!data || data.getChatHistory!.length === 0) {
    if (chat.id === "default-chat-id") {
      const chatHistoryItem = [
        {
          date: new Date(chat.createdAt!).toDateString(),
          messages: {
            unseenMessages: [chat.latestMessage],
            seenMessages: [],
            sessionUserMessages: [],
          },
          activities: [],
        },
      ] as ChatHistory[];
      cacheRef.current = chatHistoryItem;
      return chatHistoryItem;
    }
  }

  return data?.getChatHistory;
};

export const useChatMembers = (chatId: string) => {
  const { data } = useQuery({
    queryKey: ["chat-members", chatId],
    queryFn: () => graphqlClient.request(getChatMembersQuery, { chatId }),
  });
  return data?.getChatMembers;
};

export const useAvailableMembers = (chatId: string, searchText: string) => {
  const { data } = useQuery({
    queryKey: ["available-members", chatId],
    queryFn: () =>
      graphqlClient.request(getAvailableMembersQuery, { chatId, searchText }),
  });

  return data?.getAvailableMembers;
};

export const usePeopleWithMessageSeen = (messageId: string) => {
  const { data } = useQuery({
    queryKey: ["people-who-seen-the-message", messageId],
    queryFn: () =>
      graphqlClient.request(getPeopleWithMessageSeenQuery, { messageId }),
  });
  return data?.getPeopleWithMessageSeen;
};
