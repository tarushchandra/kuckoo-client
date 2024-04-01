// "use client";

import { User } from "@/gql/graphql";
import {
  followUserMutation,
  removeFollowerMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";
import {
  getAllUsersQuery,
  getUserQuery,
  getSessionUserQuery,
  getFollowingsQuery,
  getFollowersQuery,
  getRecommendedUsersQuery,
} from "@/graphql/queries/user";
import { graphqlClient, graphqlEndPoint } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { print } from "graphql";

export const useSessionUser = async () => {
  const { getSessionUser } = await queryClient.fetchQuery({
    queryKey: ["session-user"],
    queryFn: () => graphqlClient.request(getSessionUserQuery),
  });
  return { user: getSessionUser };
};

export const useUser = async (username: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(getUserQuery),
      variables: { username },
    }),
  });
  const data = await response.json();
  return data?.data?.getUser as User;
};

export const useAllUsers = () => {
  const response = useQuery({
    queryKey: ["all-users"],
    queryFn: () => graphqlClient.request(getAllUsersQuery),
  });
  return response.data?.getAllUsers;
};

export const useFollowers = (username: string) => {
  const response = useQuery({
    queryKey: ["followers"],
    queryFn: () => graphqlClient.request(getFollowersQuery, { username }),
  });
  return response.data?.getUser?.followers;
};

export const useFollowings = (username: string) => {
  const response = useQuery({
    queryKey: ["followings"],
    queryFn: () => graphqlClient.request(getFollowingsQuery, { username }),
  });
  return response.data?.getUser?.followings;
};

export const useFollowUser = async (userId: string) => {
  const { followUser } = await graphqlClient.request(followUserMutation, {
    to: userId,
  });
  return followUser;
};

export const useUnfollowUser = async (userId: string) => {
  const { unfollowUser } = await graphqlClient.request(unfollowUserMutation, {
    to: userId,
  });
  return unfollowUser;
};

export const useRemoveFollower = async (userId: string) => {
  const { removeFollower } = await graphqlClient.request(
    removeFollowerMutation,
    {
      userId,
    }
  );
  return removeFollower;
};

export const useRecommendedUsers = () => {
  const { data } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: () => graphqlClient.request(getRecommendedUsersQuery),
  });
  return data?.getRecommendedUsers;
};
