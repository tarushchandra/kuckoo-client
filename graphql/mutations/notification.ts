import { graphql } from "@/gql";

export const setNotificationsAsSeenMutation = graphql(/* GraphQL */ `
  mutation setNotificationsAsSeenMutation {
    setNotificationsAsSeen
  }
`);
