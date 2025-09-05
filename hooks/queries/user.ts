"use client";
import { graphqlClient } from "@/lib/clients/graphql";
import { useQuery } from "@tanstack/react-query";
import {
  getAllUsersQuery,
  getFollowingsQuery,
  getFollowersQuery,
  getRecommendedUsersQuery,
  getMutualFollowersQuery,
  getIsFollowingQuery,
} from "@/graphql/queries/user";

export const useAllUsers = () => {
  const response = useQuery({
    queryKey: ["all-users"],
    queryFn: () => graphqlClient.request(getAllUsersQuery),
  });
  return response.data?.getAllUsers;
};

export const useFollowers = (username: string) => {
  const response = useQuery({
    queryKey: ["followers", username],
    queryFn: () => graphqlClient.request(getFollowersQuery, { username }),
  });

  return response.data?.getUser?.followers;
};

export const useFollowings = (username: string) => {
  const response = useQuery({
    queryKey: ["followings", username],
    queryFn: () => graphqlClient.request(getFollowingsQuery, { username }),
  });

  return response.data?.getUser?.followings;
};

export const useIsFollowing = (sessionUserId: string, targetUserId: string) => {
  const response = useQuery({
    queryKey: [sessionUserId, "is-following", targetUserId],
    queryFn: () =>
      graphqlClient.request(getIsFollowingQuery, { userId: targetUserId }),
    staleTime: 0,
  });
  return response.data?.isFollowing;
};

export const useMutualFollowers = (username: string) => {
  const { data } = useQuery({
    queryKey: ["mutual-followers", username],
    queryFn: () => graphqlClient.request(getMutualFollowersQuery, { username }),
  });

  return data?.getMutualFollowers;
};

export const useRecommendedUsers = () => {
  const { data } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: () => graphqlClient.request(getRecommendedUsersQuery),
  });
  return data?.getRecommendedUsers;
};
