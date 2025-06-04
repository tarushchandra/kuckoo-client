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
      updatedAt
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

// export const getTweetsFeedQuery = graphql(/* GraphQL */ `
//   query GetTweetsFeed {
//     getTweetsFeed {
//       id
//       content
//       imageURL
//       createdAt
//       updatedAt
//       author {
//         firstName
//         lastName
//         username
//         profileImageURL
//       }
//       tweetEngagement {
//         likesCount
//         isTweetLikedBySessionUser
//         commentsCount
//         isTweetBookmarkedBySessionUser
//       }
//     }
//   }
// `);

export const getPaginatedTweetsFeedQuery = graphql(/* GraphQL */ `
  query GetPaginatedTweetsFeed($limit: Int!, $cursor: String) {
    getPaginatedTweetsFeed(limit: $limit, cursor: $cursor) {
      tweets {
        id
        content
        imageURL
        createdAt
        updatedAt
        author {
          firstName
          lastName
          username
          profileImageURL
        }
        tweetEngagement {
          likesCount
          isTweetLikedBySessionUser
          commentsCount
          isTweetBookmarkedBySessionUser
        }
      }
      nextCursor
    }
  }
`);

export const getPaginatedUserTweetsQuery = graphql(/* GraphQL */ `
  query GetPaginatedUserTweetsQuery(
    $userId: String!
    $limit: Int!
    $cursor: String
  ) {
    getPaginatedTweets(userId: $userId, limit: $limit, cursor: $cursor) {
      tweets {
        id
        content
        imageURL
        createdAt
        updatedAt
        tweetEngagement {
          likesCount
          isTweetLikedBySessionUser
          commentsCount
        }
      }
      nextCursor
    }
  }
`);
