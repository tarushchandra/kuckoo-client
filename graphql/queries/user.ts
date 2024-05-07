import { graphql } from "@/gql";

export const getCustomUserTokenQuery = graphql(/* GraphQL */ `
  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {
    getCustomUserToken(googleToken: $googleToken, user: $user)
  }
`);

export const getUserQuery = graphql(/* GraphQL */ `
  query GetUserQuery($username: String) {
    getUser(username: $username) {
      id
      firstName
      lastName
      profileImageURL
      followersCount
      followingsCount
      createdAt
      tweets {
        id
      }
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
      followers {
        username
      }
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

export const getFollowersQuery = graphql(/* GraphQL */ `
  query GetFollowersQuery($username: String) {
    getUser(username: $username) {
      followers {
        id
        firstName
        lastName
        username
        email
        profileImageURL
      }
    }
  }
`);

export const getFollowingsQuery = graphql(/* GraphQL */ `
  query GetFollowingsQuery($username: String) {
    getUser(username: $username) {
      followings {
        id
        firstName
        lastName
        username
        email
        profileImageURL
      }
    }
  }
`);

export const getMutualFollowersQuery = graphql(/* GraphQL */ `
  query GetMutualUsers($username: String!) {
    getMutualFollowers(username: $username) {
      username
      profileImageURL
    }
  }
`);

export const getIsFollowingQuery = graphql(/* GraphQL */ `
  query GetIsFollowingQuery($userId: String!) {
    isFollowing(userId: $userId)
  }
`);

export const getRecommendedUsersQuery = graphql(/* GraphQL */ `
  query GetRecommendedUsersQuery {
    getRecommendedUsers {
      id
      firstName
      lastName
      username
      email
      profileImageURL
    }
  }
`);

export const getUserTweetsQuery = graphql(/* GraphQL */ `
  query GetUserTweetsQuery($username: String) {
    getUser(username: $username) {
      tweets {
        id
        content
        imageURL
        createdAt
        tweetEngagement {
          likesCount
          isTweetLikedBySessionUser
        }
      }
    }
  }
`);
