import { queryClient } from "@/lib/clients/query";

export const getUnseenMessagesCount = () => {
  const currentUnseenChatsCount: any = queryClient.getQueryData([
    "unseen-chats-count",
  ]);
  return currentUnseenChatsCount.getUnseenChatsCount;
};
