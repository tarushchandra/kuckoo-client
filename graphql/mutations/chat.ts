import { graphql } from "@/gql";

export const createMessageMutation = graphql(/* GraphQL */ `
  mutation CreateMessageMutation($payload: CreateMessagePayload!) {
    createMessage(payload: $payload) {
      id
      chat {
        id
      }
    }
  }
`);

export const createGroupMutation = graphql(/* GraphQL */ `
  mutation CreateGroupMutation($name: String!, $targetUserIds: [String]!) {
    createGroup(name: $name, targetUserIds: $targetUserIds)
  }
`);

export const renameGroupMutation = graphql(/* GraphQL */ `
  mutation RenameGroupMutation($chatId: String!, $name: String!) {
    renameGroup(chatId: $chatId, name: $name)
  }
`);

export const addMembersToGroupMutation = graphql(/* GraphQL */ `
  mutation AddMembersToGroup($chatId: String!, $targetUserIds: [String]!) {
    addMembersToGroup(chatId: $chatId, targetUserIds: $targetUserIds)
  }
`);

export const removeMemberFromGroupMutation = graphql(/* GraphQL */ `
  mutation RemoveMemberFromGroup($chatId: String!, $targetUserId: String!) {
    removeMemberFromGroup(chatId: $chatId, targetUserId: $targetUserId)
  }
`);

export const leaveGroupMutation = graphql(/* GraphQL */ `
  mutation LeaveGroup($chatId: String!) {
    leaveGroup(chatId: $chatId)
  }
`);

export const addGroupAdminMutation = graphql(/* GraphQL */ `
  mutation MakeGroupAdmin($chatId: String!, $targetUserId: String!) {
    makeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)
  }
`);

export const removeGroupAdminMutation = graphql(/* GraphQL */ `
  mutation RemoveGroupAdmin($chatId: String!, $targetUserId: String!) {
    removeGroupAdmin(chatId: $chatId, targetUserId: $targetUserId)
  }
`);

export const setMessagesAsSeenMutation = graphql(/* GraphQL */ `
  mutation SeenBy($chatId: String!, $messageIds: [String]!) {
    seenBy(chatId: $chatId, messageIds: $messageIds)
  }
`);
