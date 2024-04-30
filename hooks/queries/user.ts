"use client";
import { User } from "@/gql/graphql";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import {
  getAllUsersQuery,
  getFollowingsQuery,
  getFollowersQuery,
  getRecommendedUsersQuery,
  getMutualFollowersQuery,
  getIsFollowingQuery,
  getUserTweets,
} from "@/graphql/queries/user";
import { followUserMutation } from "@/graphql/mutations/user";

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

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["followers"] });
    };
  }, [username]);
  return response.data?.getUser?.followers;
};

export const useFollowings = (username: string) => {
  const response = useQuery({
    queryKey: ["followings"],
    queryFn: () => graphqlClient.request(getFollowingsQuery, { username }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["followings"] });
    };
  }, [username]);

  return response.data?.getUser?.followings;
};

export const useIsFollowing = (sessionUserId: string, targetUserId: string) => {
  const response = useQuery({
    queryKey: [sessionUserId, "is-following", targetUserId],
    queryFn: () =>
      graphqlClient.request(getIsFollowingQuery, { userId: targetUserId }),
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: [sessionUserId, "is-following", targetUserId],
      });
    };
  });
  return response.data?.isFollowing;
};

export const useMutualFollowers = (username: string) => {
  const { data } = useQuery({
    queryKey: ["mutual-followers"],
    queryFn: () => graphqlClient.request(getMutualFollowersQuery, { username }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["mutual-followers"] });
    };
  }, [username]);
  return data?.getMutualFollowers;
};

export const useRecommendedUsers = () => {
  const { data } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: () => graphqlClient.request(getRecommendedUsersQuery),
  });
  return data?.getRecommendedUsers;
};

// ------------------------------------------------------------------------
