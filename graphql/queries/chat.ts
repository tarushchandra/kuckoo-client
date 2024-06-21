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

export const getChatHistoryQuery = graphql(/* GraphQL */ `
  query getChatHistoryQuery($chatId: String!) {
    getChatHistory(chatId: $chatId) {
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
      activities {
        id
        type
        user {
          firstName
          lastName
          username
        }
        targetUser {
          firstName
          lastName
          username
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

export const getAvailableMembersQuery = graphql(/* GraphQL */ `
  query getAvailableMembersQuery($chatId: String!, $searchText: String!) {
    getAvailableMembers(chatId: $chatId, searchText: $searchText) {
      id
      firstName
      lastName
      username
      profileImageURL
    }
  }
`);
