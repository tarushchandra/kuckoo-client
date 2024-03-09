import { graphql } from "@/gql";

export const getCustomUserTokenQuery = graphql(/* GraphQL */ `
  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {
    getCustomUserToken(googleToken: $googleToken, user: $user)
  }
`);

export const getCurrentUserQuery = graphql(/* GraphQL */ `
  query GetCurrentUserQuery {
    getCurrentUser {
      id
      firstName
      lastName
      username
      profileImageURL
      email
    }
  }
`);

export const isUsernameExistQuery = graphql(/* GraphQL */ `
  query IsUsernameExistQuery($username: String!) {
    isUsernameExist(username: $username)
  }
`);

export const isEmailExistQuery = graphql(/* GraphQL */ `
  query IsEmailExistQuery($email: String!) {
    isEmailExist(email: $email)
  }
`);
