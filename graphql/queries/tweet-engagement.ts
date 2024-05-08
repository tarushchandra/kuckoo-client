import { graphql } from "@/gql";

export const getTweetEngagementQuery = graphql(/* GraphQL */ `
  query GetTweetEnagagementQuery($tweetId: String!) {
    getTweet(tweetId: $tweetId) {
      tweetEngagement {
        likesCount
        isTweetLikedBySessionUser
      }
    }
  }
`);
