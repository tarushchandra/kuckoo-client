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

export const getLikedByQuery = graphql(/* GraphQL */ `
  query GetLikedByQuery($tweetId: String!) {
    getTweetEngagement(tweetId: $tweetId) {
      likedBy {
        username
        profileImageURL
      }
    }
  }
`);

export const getDetailedLikedByQuery = graphql(/* GraphQL */ `
  query GetDetailedLikedByQuery($tweetId: String!) {
    getTweetEngagement(tweetId: $tweetId) {
      likedBy {
        username
        profileImageURL
        firstName
        lastName
        id
      }
    }
  }
`);
