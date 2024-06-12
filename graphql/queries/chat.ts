import { graphql } from "@/gql";

export const getChatsQuery = graphql(/* GraphQL */ `
  query GetChatsQuery {
    getChats {
      id
      name
      isGroupChat
      totalMembersCount
      createdAt
      creator {
        firstName
        lastName
        username
        profileImageURL
      }
      members {
        firstName
        lastName
        username
        profileImageURL
      }
      latestMessage {
        content
        sender {
          firstName
          username
          profileImageURL
        }
        createdAt
      }
    }
  }
`);

export const getChatQuery = graphql(/* GraphQL */ `
  query GetChatQuery($targetUserId: String!) {
    getChat(targetUserId: $targetUserId) {
      id
      createdAt
      creator {
        firstName
        lastName
        username
      }
    }
  }
`);

export const getChatMessagesQuery = graphql(/* GraphQL */ `
  query getChatMessagesQuery($chatId: String!) {
    getChatMessages(chatId: $chatId) {
      date
      messages {
        id
        content
        sender {
          id
          username
          profileImageURL
        }
        createdAt
      }
    }
  }
`);

export const getChatMembersQuery = graphql(/* GraphQL */ `
  query getChatMembersQuery($chatId: String!) {
    getChatMembers(chatId: $chatId) {
      user {
        firstName
        lastName
        username
        profileImageURL
      }
      role
    }
  }
`);
