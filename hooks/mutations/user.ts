import {
  followUserMutation,
  removeFollowerMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";
import revalidateProfileUser from "@/lib/actions/user";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";

interface FollowsMutationPayload {
  sessionUserId: string;
  targetUserId: string;
  sessionUsername: string;
  targetUsername: string;
}

export const useFollowUser = () => {
  return useMutation({
    mutationFn: (variables: FollowsMutationPayload) =>
      graphqlClient.request(followUserMutation, {
        to: variables.targetUserId,
      }),
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          variables.sessionUserId,
          "is-following",
          variables.targetUserId,
        ],
      });
      await queryClient.invalidateQueries({
        queryKey: ["total-followers"],
      });
      // await revalidateProfileUser(
      //   variables.sessionUsername,
      //   variables.targetUsername
      // );
    },
  });
};

export const useUnfollowUser = () => {
  return useMutation({
    mutationFn: (variables: FollowsMutationPayload) =>
      graphqlClient.request(unfollowUserMutation, {
        to: variables.targetUserId,
      }),
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          variables.sessionUserId,
          "is-following",
          variables.targetUserId,
        ],
      });
      await queryClient.invalidateQueries({
        queryKey: ["total-followers"],
      });
      // await revalidateProfileUser(
      //   variables.sessionUsername,
      //   variables.targetUsername
      // );
    },
  });
};

export const useRemoveFollower = () => {
  return useMutation({
    mutationFn: (variables: FollowsMutationPayload) =>
      graphqlClient.request(removeFollowerMutation, {
        userId: variables.targetUserId,
      }),
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          variables.targetUserId,
          "is-following",
          variables.sessionUserId,
        ],
      });
      // await revalidateProfileUser(
      //   variables.sessionUsername,
      //   variables.targetUsername
      // );
    },
  });
};
