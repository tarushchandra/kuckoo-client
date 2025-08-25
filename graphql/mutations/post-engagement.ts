import { graphql } from "@/gql";

export const likePostMutation = graphql(/* GraphQL */ `
  mutation LikePostMutation($postId: String!) {
    likePost(postId: $postId)
  }
`);

export const dislikePostMutation = graphql(/* GraphQL */ `
  mutation DislikePostMutation($postId: String!) {
    dislikePost(postId: $postId)
  }
`);

export const createCommentMutation = graphql(/* GraphQL */ `
  mutation CreateComment($postId: String!, $content: String!) {
    createComment(postId: $postId, content: $content)
  }
`);

export const editCommentMutation = graphql(/* GraphQL */ `
  mutation EditComment($commentId: String!, $content: String!) {
    updateComment(commentId: $commentId, content: $content)
  }
`);

export const deleteCommentMutation = graphql(/* GraphQL */ `
  mutation DeleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId)
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
    $postId: String!
    $commentId: String!
    $content: String!
  ) {
    createReply(postId: $postId, commentId: $commentId, content: $content)
  }
`);

// -------------------------------------------------------------

export const createBookmarkMutation = graphql(/* GraphQL */ `
  mutation CreateBookmark($postId: String!) {
    createBookmark(postId: $postId)
  }
`);

export const removeBookmarkMutation = graphql(/* GraphQL */ `
  mutation RemoveBookmark($postId: String!) {
    removeBookmark(postId: $postId)
  }
`);
