import { graphql } from "@/gql";

export const getSignedURLForUploadingImageQuery = graphql(/* GraphQL */ `
  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {
    getSignedURLForUploadingImage(payload: $payload)
  }
`);

export const getTweetQuery = graphql(/* GraphQL */ `
  query GetTweet($tweetId: String!) {
    getTweet(tweetId: $tweetId) {
      content
      id
      imageURL
      createdAt
      author {
        id
        firstName
        lastName
        username
        profileImageURL
      }
    }
  }
`);

export const getTweetsFeedQuery = graphql(/* GraphQL */ `
  query GetTweetsFeed {
    getTweetsFeed {
      id
      content
      imageURL
      createdAt
      author {
        firstName
        lastName
        username
        profileImageURL
      }
      tweetEngagement {
        likesCount
        isTweetLikedBySessionUser
      }
    }
  }
`);
