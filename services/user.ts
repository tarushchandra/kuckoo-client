import { User } from "@/gql/graphql";
import {
  getSessionUserQuery,
  getUserQuery,
  getUsersQuery,
  verifyAccessTokenQuery,
  verifyRefreshTokenQuery,
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

export const verifyAccessToken = async (accessToken: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(verifyAccessTokenQuery),
      variables: { accessToken },
    }),
  });
  const data = await response.json();
  return data?.data?.verifyAccessToken;
};

export const verifyRefreshToken = async (refreshToken: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(verifyRefreshTokenQuery),
      variables: { refreshToken },
    }),
    credentials: "include",
  });
  const data = await response.json();
  return {
    isRefreshTokenValid: data?.data?.verifyRefreshToken,
    setCookieHeader: response.headers.getSetCookie()[0],
  };
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
    cache: "no-store",
  });
  const data = await response.json();
  return data?.data?.getUser as User;
};

export const getUsers = async (searchText: string) => {
  try {
    const { getUsers } = await queryClient.fetchQuery({
      queryKey: ["users-with-search-text", searchText],
      queryFn: () => graphqlClient.request(getUsersQuery, { searchText }),
    });
    return getUsers;
  } catch (err) {
    return err;
  }
};
