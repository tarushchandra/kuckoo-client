import { getChatMessagesQuery, getChatsQuery } from "@/graphql/queries/chat";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChats = () => {
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: () => graphqlClient.request(getChatsQuery),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["chats"] });
    };
  }, []);

  return data?.getChats;
};

export const useChatMessages = (chatId: string) => {
  const { data } = useQuery({
    queryKey: ["chat-messages", chatId],
    queryFn: () => graphqlClient.request(getChatMessagesQuery, { chatId }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["chat-messages", chatId] });
    };
  }, []);

  return data?.getChatMessages;
};
