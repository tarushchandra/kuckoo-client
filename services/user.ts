import { User } from "@/gql/graphql";
import {
  followUserMutation,
  removeFollowerMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";
import {
  getSessionUserQuery,
  getTotalFollowersQuery,
  getTotalFollowingsQuery,
  getUserQuery,
} from "@/graphql/queries/user";
import { graphqlClient, graphqlEndPoint } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { print } from "graphql";

export const getSessionUser = async () => {
  const { getSessionUser } = await queryClient.fetchQuery({
    queryKey: ["session-user"],
    queryFn: () => graphqlClient.request(getSessionUserQuery),
  });
  return { user: getSessionUser };
};

export const getUser = async (username: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(getUserQuery),
      variables: { username },
    }),
    next: {
      tags: [`/profile/${username}`],
    },
    // cache: "no-store",
  });
  const data = await response.json();
  return data?.data?.getUser as User;
};

export const getTotalFollowers = async (username: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(getTotalFollowersQuery),
      variables: { username },
    }),
    cache: "no-store",
  });
  const data = await response.json();
  return data?.data?.getUser?.totalFollowers;
};

export const getTotalFollowings = async (username: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(getTotalFollowingsQuery),
      variables: { username },
    }),
    cache: "no-store",
  });
  const data = await response.json();
  return data?.data?.getUser?.totalFollowings;
};
