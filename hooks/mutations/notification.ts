import { setNotificationsAsSeenMutation } from "@/graphql/mutations/notification";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";

export const useSetNotificationsAsSeen = () => {
  return useMutation({
    mutationFn: () => graphqlClient.request(setNotificationsAsSeenMutation),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["unseen-notifications-count"],
      }),
  });
};
