"use client";
import {
  getAllNotificationsQuery,
  getUnseenNotificationsCountQuery,
} from "@/graphql/queries/notification";
import { graphqlClient } from "@/lib/clients/graphql";
import { useQuery } from "@tanstack/react-query";

export const useUnseenNotificationsCount = () => {
  const { data } = useQuery({
    queryKey: ["unseen-notifications-count"],
    queryFn: () => graphqlClient.request(getUnseenNotificationsCountQuery),
  });
  return data?.getUnseenNotificationsCount;
};

export const useAllNotifications = () => {
  const { data } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: () => graphqlClient.request(getAllNotificationsQuery),
  });

  return {
    seenNotifications: data?.getAllNotifications?.seenNotifications,
    unseenNotifications: data?.getAllNotifications?.unseenNotifications,
  };
};
