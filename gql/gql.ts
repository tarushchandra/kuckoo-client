/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateTweet($payload: TweetInput!) {\n    createTweet(payload: $payload)\n  }\n": types.CreateTweetDocument,
    "\n  mutation DeleteTweet($tweetId: ID!) {\n    deleteTweet(tweetId: $tweetId)\n  }\n": types.DeleteTweetDocument,
    "\n  mutation UpdateTweet($tweetId: ID!, $content: String!) {\n    updateTweet(tweetId: $tweetId, content: $content)\n  }\n": types.UpdateTweetDocument,
    "\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n": types.CreateUserWithEmailAndPasswordMutationDocument,
    "\n  mutation FollowUserMutation($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserMutationDocument,
    "\n  mutation UnfollowUserMutation($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserMutationDocument,
    "\n  mutation RemoveFollower($userId: ID!) {\n    removeFollower(userId: $userId)\n  }\n": types.RemoveFollowerDocument,
    "\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n": types.GetSignedUrlForUploadingImageQueryDocument,
    "\n  query GetTweetsFeed {\n    getTweetsFeed {\n      id\n      content\n      imageURL\n      createdAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n": types.GetTweetsFeedDocument,
    "\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n": types.GetCustomUserTokenQueryDocument,
    "\n  query GetUserQuery($username: String) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      tweets {\n        id\n      }\n    }\n  }\n": types.GetUserQueryDocument,
    "\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n": types.GetSessionUserQueryDocument,
    "\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n      followers {\n        username\n      }\n    }\n  }\n": types.GetAllUsersQueryDocument,
    "\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n": types.IsUsernameExistQueryDocument,
    "\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n": types.IsEmailExistQueryDocument,
    "\n  query GetFollowersQuery($username: String) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n": types.GetFollowersQueryDocument,
    "\n  query GetFollowingsQuery($username: String) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n": types.GetFollowingsQueryDocument,
    "\n  query GetMutualUsers($username: String!) {\n    getMutualFollowers(username: $username) {\n      username\n      profileImageURL\n    }\n  }\n": types.GetMutualUsersDocument,
    "\n  query GetIsFollowingQuery($userId: String!) {\n    isFollowing(userId: $userId)\n  }\n": types.GetIsFollowingQueryDocument,
    "\n  query GetRecommendedUsersQuery {\n    getRecommendedUsers {\n      id\n      firstName\n      lastName\n      username\n      email\n      profileImageURL\n    }\n  }\n": types.GetRecommendedUsersQueryDocument,
    "\n  query GetUserTweetsQuery($username: String) {\n    getUser(username: $username) {\n      tweets {\n        id\n        content\n        imageURL\n        createdAt\n      }\n    }\n  }\n": types.GetUserTweetsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTweet($payload: TweetInput!) {\n    createTweet(payload: $payload)\n  }\n"): (typeof documents)["\n  mutation CreateTweet($payload: TweetInput!) {\n    createTweet(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTweet($tweetId: ID!) {\n    deleteTweet(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation DeleteTweet($tweetId: ID!) {\n    deleteTweet(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTweet($tweetId: ID!, $content: String!) {\n    updateTweet(tweetId: $tweetId, content: $content)\n  }\n"): (typeof documents)["\n  mutation UpdateTweet($tweetId: ID!, $content: String!) {\n    updateTweet(tweetId: $tweetId, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n"): (typeof documents)["\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FollowUserMutation($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  mutation FollowUserMutation($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnfollowUserMutation($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  mutation UnfollowUserMutation($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFollower($userId: ID!) {\n    removeFollower(userId: $userId)\n  }\n"): (typeof documents)["\n  mutation RemoveFollower($userId: ID!) {\n    removeFollower(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n"): (typeof documents)["\n  query getSignedURLForUploadingImageQuery($payload: imageUploadInput!) {\n    getSignedURLForUploadingImage(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTweetsFeed {\n    getTweetsFeed {\n      id\n      content\n      imageURL\n      createdAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTweetsFeed {\n    getTweetsFeed {\n      id\n      content\n      imageURL\n      createdAt\n      author {\n        firstName\n        lastName\n        username\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n"): (typeof documents)["\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserQuery($username: String) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      tweets {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserQuery($username: String) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      profileImageURL\n      followersCount\n      followingsCount\n      createdAt\n      tweets {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n      followers {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n      followers {\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n"): (typeof documents)["\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n"): (typeof documents)["\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFollowersQuery($username: String) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFollowersQuery($username: String) {\n    getUser(username: $username) {\n      followers {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFollowingsQuery($username: String) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFollowingsQuery($username: String) {\n    getUser(username: $username) {\n      followings {\n        id\n        firstName\n        lastName\n        username\n        email\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMutualUsers($username: String!) {\n    getMutualFollowers(username: $username) {\n      username\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  query GetMutualUsers($username: String!) {\n    getMutualFollowers(username: $username) {\n      username\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetIsFollowingQuery($userId: String!) {\n    isFollowing(userId: $userId)\n  }\n"): (typeof documents)["\n  query GetIsFollowingQuery($userId: String!) {\n    isFollowing(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecommendedUsersQuery {\n    getRecommendedUsers {\n      id\n      firstName\n      lastName\n      username\n      email\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  query GetRecommendedUsersQuery {\n    getRecommendedUsers {\n      id\n      firstName\n      lastName\n      username\n      email\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserTweetsQuery($username: String) {\n    getUser(username: $username) {\n      tweets {\n        id\n        content\n        imageURL\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserTweetsQuery($username: String) {\n    getUser(username: $username) {\n      tweets {\n        id\n        content\n        imageURL\n        createdAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;