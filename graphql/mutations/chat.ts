import { graphql } from "@/gql";

export const createMessageMutation = graphql(/* GraphQL */ `
  mutation CreateMessageMutation($payload: CreateMessagePayload!) {
    createMessage(payload: $payload)
  }
`);
