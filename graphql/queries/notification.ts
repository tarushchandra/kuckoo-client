import { graphql } from "@/gql";

export const getUnseenNotificationsCountQuery = graphql(/* GraphQL */ `
  query GetUnseenNotificationsCountQuery {
    getUnseenNotificationsCount
  }
`);

export const getAllNotificationsQuery = graphql(/* GraphQL */ `
  query GetAllNotificationsQuery {
    getAllNotifications {
      seenNotifications {
        id
        type
        sender {
          id
          firstName
          lastName
          profileImageURL
          username
        }
        createdAt
        metaData {
          post {
            id
            imageURL
          }
          comment {
            content
          }
          repliedComment {
            content
          }
        }
      }

      unseenNotifications {
        id
        type
        sender {
          id
          firstName
          lastName
          profileImageURL
          username
        }
        createdAt
        metaData {
          post {
            id
            imageURL
          }
          comment {
            content
          }
          repliedComment {
            content
          }
        }
      }
    }
  }
`);
