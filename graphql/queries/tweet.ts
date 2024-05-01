import { graphql } from "@/gql";

export const getSignedURLForUploadingImageQuery = graphql(/* GraphQL */ `
  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {
    getSignedURLForUploadingImage(payload: $payload)
  }
`);

export const getSignedURLForAccessingImageQuery = graphql(/* GraphQL */ `
  query getSignedURLForAccessingImageQuery($key: String!) {
    getSignedURLForAccessingImage(key: $key)
  }
`);
