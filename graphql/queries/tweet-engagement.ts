import { graphql } from "@/gql";

export const getTweetEngagementQuery = graphql(/* GraphQL */ `
  query GetTweetEnagagementQuery($tweetId: String!) {
    getTweet(tweetId: $tweetId) {
      tweetEngagement {
        likesCount
        isTweetLikedBySessionUser
        commentsCount
      }
    }
  }
`);

export const getLikedByQuery = graphql(/* GraphQL */ `
  query GetLikedByQuery($tweetId: String!) {
    getTweetEngagement(tweetId: $tweetId) {
      likes {
        username
        profileImageURL
      }
    }
  }
`);

export const getDetailedLikedByQuery = graphql(/* GraphQL */ `
  query GetDetailedLikedByQuery($tweetId: String!) {
    getTweetEngagement(tweetId: $tweetId) {
      likes {
        username
        profileImageURL
        firstName
        lastName
        id
      }
    }
  }
`);

export const getTweetCommentsQuery = graphql(/* GraphQL */ `
  query GetTweetCommentsQuery($tweetId: String!) {
    getTweet(tweetId: $tweetId) {
      tweetEngagement {
        comments {
          id
          content
          createdAt
          updatedAt
          likesCount
          isCommentLikedBySessionUser
          author {
            firstName
            lastName
            username
            profileImageURL
          }
        }
      }
    }
  }
`);
