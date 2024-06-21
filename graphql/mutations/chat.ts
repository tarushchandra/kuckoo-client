import { graphql } from "@/gql";

export const createMessageMutation = graphql(/* GraphQL */ `
  mutation CreateMessageMutation($payload: CreateMessagePayload!) {
    createMessage(payload: $payload) {
      id
    }
  }
`);

export const createGroupMutation = graphql(/* GraphQL */ `
  mutation CreateGroupMutation($name: String!, $targetUserIds: [String]!) {
    createGroup(name: $name, targetUserIds: $targetUserIds)
  }
`);

export const addMembersToGroupMutation = graphql(/* GraphQL */ `
  mutation AddMembersToGroup($chatId: String!, $targetUserIds: [String]!) {
    addMembersToGroup(chatId: $chatId, targetUserIds: $targetUserIds)
  }
`);

export const renameGroupMutation = graphql(/* GraphQL */ `
  mutation RenameGroupMutation($chatId: String!, $name: String!) {
    renameGroup(chatId: $chatId, name: $name)
  }
`);
