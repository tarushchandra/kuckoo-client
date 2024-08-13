import { ChatHistory } from "@/gql/graphql";
import { getChatHistoryQuery } from "@/graphql/queries/chat";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async ({
    chatId,
    recentChatHistory,
  }: {
    chatId: string;
    recentChatHistory?: ChatHistory[];
  }) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["chat-history", chatId],
        queryFn: () => graphqlClient.request(getChatHistoryQuery, { chatId }),
      });

      return data.getChatHistory;
    } catch (err) {
      throw err;
    }
  }
);
