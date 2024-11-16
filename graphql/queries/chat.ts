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
        id
        firstName
        lastName
        username
        profileImageURL
        lastSeenAt
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
      unseenMessagesCount
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
      unseenMessagesCount
    }
  }
`);

export const getChatHistoryQuery = graphql(/* GraphQL */ `
  query getChatHistoryQuery($chatId: String!) {
    getChatHistory(chatId: $chatId) {
      date
      messages {
        unseenMessages {
          id
          content
          sender {
            id
            username
            profileImageURL
          }
          createdAt
        }
        seenMessages {
          id
          content
          sender {
            id
            username
            profileImageURL
          }
          createdAt
        }
        sessionUserMessages {
          id
          content
          sender {
            id
            username
            profileImageURL
          }
          createdAt
          seenBy {
            id
          }
        }
      }
      activities {
        id
        type
        metaData {
          chatName
        }
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
        id
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

export const getUnseenChatsCountQuery = graphql(/* GraphQL */ `
  query GetUnseenChatsCountQuery {
    getUnseenChatsCount
  }
`);

export const getPeopleWithMessageSeenQuery = graphql(/* GraphQL */ `
  query GetPeopleWithMessageSeen($messageId: String!) {
    getPeopleWithMessageSeen(messageId: $messageId) {
      id
      firstName
      lastName
      username
      profileImageURL
    }
  }
`);
