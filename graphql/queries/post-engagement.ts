import { graphql } from "@/gql";

export const getPostEngagementQuery = graphql(/* GraphQL */ `
  query GetPostEnagagementQuery($postId: String!) {
    getPost(postId: $postId) {
      postEngagement {
        likesCount
        isPostLikedBySessionUser
        commentsCount
        isPostBookmarkedBySessionUser
      }
    }
  }
`);

export const getLikedByQuery = graphql(/* GraphQL */ `
  query GetLikedByQuery($postId: String!) {
    getPostEngagement(postId: $postId) {
      likes {
        username
        profileImageURL
      }
    }
  }
`);

export const getDetailedLikedByQuery = graphql(/* GraphQL */ `
  query GetDetailedLikedByQuery($postId: String!) {
    getPostEngagement(postId: $postId) {
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

export const getPostCommentsQuery = graphql(/* GraphQL */ `
  query GetPostCommentsQuery($postId: String!) {
    getPost(postId: $postId) {
      postEngagement {
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

          commentsCount
          parentComment {
            id
          }
        }
      }
    }
  }
`);

export const getCommentsOfCommentQuery = graphql(/* GraphQL */ `
  query GetCommentsOfComment($commentId: String!) {
    getCommentsOfComment(commentId: $commentId) {
      id
      content
      createdAt
      updatedAt
      author {
        firstName
        lastName
        username
        profileImageURL
      }

      likesCount
      isCommentLikedBySessionUser

      parentComment {
        id
      }

      repliedTo {
        id
        author {
          username
        }
      }
    }
  }
`);

export const getRepliedToCommentQuery = graphql(/* GraphQL */ `
  query getRepliedToComment($commentId: String!, $postId: String!) {
    getComment(commentId: $commentId, postId: $postId) {
      repliedTo {
        content
        createdAt
        author {
          firstName
          lastName
          username
          profileImageURL
        }
      }
    }
  }
`);

// -----------------------------------------------------------

export const getBookmarksQuery = graphql(/* GraphQL */ `
  query GetBookmarksQuery {
    getBookmarks {
      id
      content
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
      postEngagement {
        likesCount
        isPostLikedBySessionUser
        commentsCount
        isPostBookmarkedBySessionUser
      }
    }
  }
`);
