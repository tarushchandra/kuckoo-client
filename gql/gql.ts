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
    "\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n": types.CreateUserWithEmailAndPasswordMutationDocument,
    "\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n": types.GetCustomUserTokenQueryDocument,
    "\n  query GetCurrentUserQuery($username: String) {\n    getCurrentUser(username: $username) {\n      firstName\n      lastName\n      profileImageURL\n    }\n  }\n": types.GetCurrentUserQueryDocument,
    "\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n": types.GetSessionUserQueryDocument,
    "\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n": types.GetAllUsersQueryDocument,
    "\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n": types.IsUsernameExistQueryDocument,
    "\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n": types.IsEmailExistQueryDocument,
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
export function graphql(source: "\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n"): (typeof documents)["\n  mutation createUserWithEmailAndPasswordMutation($user: SignUpFormInput!) {\n    createUserWithEmailAndPassword(user: $user)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n"): (typeof documents)["\n  query getCustomUserTokenQuery($googleToken: String, $user: SignInFormInput) {\n    getCustomUserToken(googleToken: $googleToken, user: $user)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUserQuery($username: String) {\n    getCurrentUser(username: $username) {\n      firstName\n      lastName\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUserQuery($username: String) {\n    getCurrentUser(username: $username) {\n      firstName\n      lastName\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetSessionUserQuery {\n    getSessionUser {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsersQuery {\n    getAllUsers {\n      id\n      firstName\n      lastName\n      username\n      profileImageURL\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n"): (typeof documents)["\n  query IsUsernameExistQuery($username: String!) {\n    isUsernameExist(username: $username)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n"): (typeof documents)["\n  query IsEmailExistQuery($email: String!) {\n    isEmailExist(email: $email)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;