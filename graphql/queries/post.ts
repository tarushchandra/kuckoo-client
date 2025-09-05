import { graphql } from "@/gql";

export const getSignedURLForUploadingImageQuery = graphql(/* GraphQL */ `
  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {
    getSignedURLForUploadingImage(payload: $payload)
  }
`);

export const getPostQuery = graphql(/* GraphQL */ `
  query GetPost($postId: String!) {
    getPost(postId: $postId) {
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

// export const getPostsFeedQuery = graphql(/* GraphQL */ `
//   query GetPostsFeed {
//     getPostsFeed {
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
//       postEngagement {
//         likesCount
//         isPostLikedBySessionUser
//         commentsCount
//         isPostBookmarkedBySessionUser
//       }
//     }
//   }
// `);

export const getPaginatedPostsFeedQuery = graphql(/* GraphQL */ `
  query GetPaginatedPostsFeed($limit: Int!, $cursor: String) {
    getPaginatedPostsFeed(limit: $limit, cursor: $cursor) {
      posts {
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
        postEngagement {
          likesCount
          isPostLikedBySessionUser
          commentsCount
          isPostBookmarkedBySessionUser
        }
      }
      nextCursor
    }
  }
`);

export const getPaginatedUserPostsQuery = graphql(/* GraphQL */ `
  query GetPaginatedUserPostsQuery(
    $userId: String!
    $limit: Int!
    $cursor: String
  ) {
    getPaginatedPosts(userId: $userId, limit: $limit, cursor: $cursor) {
      posts {
        id
        content
        imageURL
        createdAt
        updatedAt
        postEngagement {
          likesCount
          isPostLikedBySessionUser
          commentsCount
        }
      }
      nextCursor
    }
  }
`);
