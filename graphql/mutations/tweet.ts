import { graphql } from "@/gql";

export const createTweetMutation = graphql(/* GraphQL */ `
  mutation CreateTweet($payload: TweetInput!) {
    createTweet(payload: $payload)
  }
`);

export const deleteTweetMutation = graphql(/* GraphQL */ `
  mutation DeleteTweet($tweetId: ID!) {
    deleteTweet(tweetId: $tweetId)
  }
`);

export const updateTweetMutation = graphql(/* GraphQL */ `
  mutation UpdateTweet($tweetId: ID!, $content: String!) {
    updateTweet(tweetId: $tweetId, content: $content)
  }
`);
