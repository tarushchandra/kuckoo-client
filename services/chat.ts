import { getChatQuery } from "@/graphql/queries/chat";
import { graphqlClient } from "@/lib/clients/graphql";

export const getChat = async (targetUserId: string) => {
  const data = await graphqlClient.request(getChatQuery, {
    targetUserId,
  });
  return data.getChat;
};
