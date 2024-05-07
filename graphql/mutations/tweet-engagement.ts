import { graphql } from "@/gql";

export const likeTweetMutation = graphql(/* GraphQL */ `
  mutation LikeTweetMutation($tweetId: String!) {
    likeTweet(tweetId: $tweetId)
  }
`);

export const dislikeTweetMutation = graphql(/* GraphQL */ `
  mutation DislikeTweetMutation($tweetId: String!) {
    dislikeTweet(tweetId: $tweetId)
  }
`);
