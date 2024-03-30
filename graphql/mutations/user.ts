import { graphql } from "@/gql";

export const createUserWithEmailAndPasswordMutation = graphql(/* GraphQL */ `
  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {
    createUserWithEmailAndPassword(user: $user)
  }
`);

export const followUserMutation = graphql(/* GraphQL */ `
  mutation FollowUserMutation($to: ID!) {
    followUser(to: $to)
  }
`);

export const unfollowUserMutation = graphql(/* GraphQL */ `
  mutation UnfollowUserMutation($to: ID!) {
    unfollowUser(to: $to)
  }
`);

export const removeFollowerMutation = graphql(/* GraphQL */ `
  mutation RemoveFollower($userId: ID!) {
    removeFollower(userId: $userId)
  }
`);
