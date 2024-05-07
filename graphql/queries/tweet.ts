import { graphql } from "@/gql";

export const getSignedURLForUploadingImageQuery = graphql(/* GraphQL */ `
  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {
    getSignedURLForUploadingImage(payload: $payload)
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
