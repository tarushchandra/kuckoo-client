"use client";
import {
  getAllNotificationsQuery,
  getUnseenNotificationsCountQuery,
} from "@/graphql/queries/notification";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUnseenNotificationsCount = () => {
  const { data } = useQuery({
    queryKey: ["unseen-notifications-count"],
    queryFn: () => graphqlClient.request(getUnseenNotificationsCountQuery),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["unseen-notifications-count"],
      });
    };
  }, []);

  return data?.getUnseenNotificationsCount;
};

export const useAllNotifications = () => {
  const { data } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: () => graphqlClient.request(getAllNotificationsQuery),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["all-notifications"],
      });
    };
  }, []);

  return {
    seenNotifications: data?.getAllNotifications?.seenNotifications,
    unseenNotifications: data?.getAllNotifications?.unseenNotifications,
  };
};
