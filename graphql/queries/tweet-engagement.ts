import { graphql } from "@/gql";

export const getTweetEngagementQuery = graphql(/* GraphQL */ `
  query GetTweetEnagagementQuery($tweetId: String!) {
    getTweet(tweetId: $tweetId) {
      tweetEngagement {
        likesCount
        isTweetLikedBySessionUser
        commentsCount
        isTweetBookmarkedBySessionUser
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
  query getRepliedToComment($commentId: String!, $tweetId: String!) {
    getComment(commentId: $commentId, tweetId: $tweetId) {
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
      tweetEngagement {
        likesCount
        isTweetLikedBySessionUser
        commentsCount
        isTweetBookmarkedBySessionUser
      }
    }
  }
`);
