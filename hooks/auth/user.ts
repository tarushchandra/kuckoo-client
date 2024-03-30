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

// export const useUser = (username: string) => {
//   console.log("getUserQuery -", getUserQuery);

//   const response = useQuery({
//     queryKey: ["user"],
//     queryFn: () => graphqlClient.request(getUserQuery, { username }),
//   });

//   useEffect(() => {
//     return () => {
//       queryClient.invalidateQueries({ queryKey: ["user"] });
//     };
//   }, [username]);

//   return response.data?.getUser;
// };

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

// export const useIsFollowing = async (username: string) => {
//   const response = await fetch(graphqlEndPoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: print(getIsFollowingQuery),
//       variables: { username },
//     }),
//   });
//   const data = await response.json();

//   console.log("is following -", data);
// };

// const access_token = localStorage.getItem("access_token")

// export const useFollowings = async (username: string) => {
//   const res = await fetch(graphqlEndPoint, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: getFollowingsQuery,
//       variables: { username }, // Pass variables if needed
//     }),
//   });
//   const data = await res.json();
//   console.log(data);
//   return data?.data?.getUser?.followings;
// };
