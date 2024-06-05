import { graphql } from "@/gql";

export const getChatsQuery = graphql(/* GraphQL */ `
  query GetChatsQuery {
    getChats {
      id
      name
      isGroupChat
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
        }
        createdAt
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
          username
          profileImageURL
        }
        createdAt
      }
    }
  }
`);
