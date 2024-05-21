import { graphql } from "@/gql";

export const likeTweetMutation = graphql(/* GraphQL */ `
  mutation LikeTweetMutation($tweetId: String!) {
    likeTweet(tweetId: $tweetId)
  }
`);

export const dislikeTweetMutation = graphql(/* GraphQL */ `
  mutation DislikeTweetMutation($tweetId: String!) {
    dislikeTweet(tweetId: $tweetId)
  }
`);

export const createCommentMutation = graphql(/* GraphQL */ `
  mutation CreateComment($tweetId: String!, $content: String!) {
    createComment(tweetId: $tweetId, content: $content)
  }
`);

export const editCommentMutation = graphql(/* GraphQL */ `
  mutation EditComment($commentId: String!, $content: String!) {
    updateComment(commentId: $commentId, content: $content)
  }
`);

export const deleteCommentMutation = graphql(/* GraphQL */ `
  mutation DeleteComment($tweetId: String!, $commentId: String!) {
    deleteComment(tweetId: $tweetId, commentId: $commentId)
  }
`);

export const likeCommentMutation = graphql(/* GraphQL */ `
  mutation LikeComment($commentId: String!) {
    likeComment(commentId: $commentId)
  }
`);

export const dislikeCommentMutation = graphql(/* GraphQL */ `
  mutation DislikeComment($commentId: String!) {
    dislikeComment(commentId: $commentId)
  }
`);

export const createCommentReplyMutation = graphql(/* GraphQL */ `
  mutation CreateReply(
    $tweetId: String!
    $commentId: String!
    $content: String!
  ) {
    createReply(tweetId: $tweetId, commentId: $commentId, content: $content)
  }
`);
