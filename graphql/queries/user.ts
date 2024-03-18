import { graphql } from "@/gql";

export const getCustomUserTokenQuery = graphql(/* GraphQL */ `
  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {
    getCustomUserToken(googleToken: $googleToken, user: $user)
  }
`);

export const getUserQuery = graphql(/* GraphQL */ `
  query GetUserQuery($username: String) {
    getUser(username: $username) {
      firstName
      lastName
      profileImageURL
    }
  }
`);

export const getSessionUserQuery = graphql(/* GraphQL */ `
  query GetSessionUserQuery {
    getSessionUser {
      id
      firstName
      lastName
      username
      profileImageURL
      email
    }
  }
`);

export const getAllUsersQuery = graphql(/* GraphQL */ `
  query GetAllUsersQuery {
    getAllUsers {
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
