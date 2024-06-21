import { getAvailableMembersQuery, getChatQuery } from "@/graphql/queries/chat";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";

export const getChat = async (targetUserId: string) => {
  const data = await graphqlClient.request(getChatQuery, {
    targetUserId,
  });
  return data.getChat;
};

export const getAvailableMembers = async (
  searchText: string,
  chatId: string
) => {
  try {
    const { getAvailableMembers } = await queryClient.fetchQuery({
      queryKey: ["users-with-search-text", searchText, chatId],
      queryFn: () =>
        graphqlClient.request(getAvailableMembersQuery, { chatId, searchText }),
    });
    return getAvailableMembers;
  } catch (err) {
    return err;
  }
};
