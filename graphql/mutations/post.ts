import { graphql } from "@/gql";

export const createPostMutation = graphql(/* GraphQL */ `
  mutation CreatePost($payload: PostInput!) {
    createPost(payload: $payload)
  }
`);

export const deletePostMutation = graphql(/* GraphQL */ `
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`);

export const updatePostMutation = graphql(/* GraphQL */ `
  mutation UpdatePost($postId: ID!, $payload: PostInput!) {
    updatePost(postId: $postId, payload: $payload)
  }
`);
