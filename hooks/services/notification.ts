import { queryClient } from "@/lib/clients/query";

export const getUnseenNotificationsCount = () => {
  const currentUnseenNotificationsCount: any = queryClient.getQueryData([
    "unseen-notifications-count",
  ]);
  return currentUnseenNotificationsCount.getUnseenNotificationsCount;
};
