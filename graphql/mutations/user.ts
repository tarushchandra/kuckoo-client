import { graphql } from "@/gql";

export const createUserWithEmailAndPasswordMutation = graphql(/* GraphQL */ `
  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {
    createUserWithEmailAndPassword(user: $user)
  }
`);
