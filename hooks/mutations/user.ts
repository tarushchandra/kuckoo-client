import {
  followUserMutation,
  removeFollowerMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";
import { revalidateUserProfile } from "@/lib/actions/user";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/react-query";
import { useMutation } from "@tanstack/react-query";

interface FollowsMutationPayload {
  sessionUserId: string;
  targetUserId: string;
  sessionUsername: string;
  targetUsername: string;
}

const onFollowsSuccess = async (variables: FollowsMutationPayload) => {
  await queryClient.invalidateQueries({
    queryKey: [variables.sessionUserId, "is-following", variables.targetUserId],
  });
  await revalidateUserProfile(variables.targetUsername);
  await queryClient.invalidateQueries({
    queryKey: ["recommended-users"],
  });
};

export const useFollowUser = () => {
  return useMutation({
    mutationFn: (variables: FollowsMutationPayload) =>
      graphqlClient.request(followUserMutation, {
        to: variables.targetUserId,
      }),
    onSuccess: async (data, variables) => onFollowsSuccess(variables),
  });
};

export const useUnfollowUser = () => {
  return useMutation({
    mutationFn: (variables: FollowsMutationPayload) =>
      graphqlClient.request(unfollowUserMutation, {
        to: variables.targetUserId,
      }),
    onSuccess: async (data, variables) => onFollowsSuccess(variables),
  });
};

export const useRemoveFollower = () => {
  return useMutation({
    mutationFn: (variables: FollowsMutationPayload) =>
      graphqlClient.request(removeFollowerMutation, {
        userId: variables.targetUserId,
      }),
  });
};
