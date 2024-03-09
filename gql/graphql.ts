/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createUserWithEmailAndPassword: Scalars['Boolean']['output'];
};


export type MutationCreateUserWithEmailAndPasswordArgs = {
  user: SignUpFormInput;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getCustomUserToken?: Maybe<Scalars['String']['output']>;
  isEmailExist?: Maybe<Scalars['Boolean']['output']>;
  isUsernameExist?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryGetCustomUserTokenArgs = {
  googleToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SignInFormInput>;
};


export type QueryIsEmailExistArgs = {
  email: Scalars['String']['input'];
};


export type QueryIsUsernameExistArgs = {
  username: Scalars['String']['input'];
};

export type SignInFormInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpFormInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type CreateUserWithEmailAndPasswordMutationMutationVariables = Exact<{
  user: SignUpFormInput;
}>;


export type CreateUserWithEmailAndPasswordMutationMutation = { __typename?: 'Mutation', createUserWithEmailAndPassword: boolean };

export type GetCustomUserTokenQueryQueryVariables = Exact<{
  googleToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SignInFormInput>;
}>;


export type GetCustomUserTokenQueryQuery = { __typename?: 'Query', getCustomUserToken?: string | null };

export type GetCurrentUserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQueryQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, username: string, profileImageURL?: string | null, email: string } | null };

export type IsUsernameExistQueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsUsernameExistQueryQuery = { __typename?: 'Query', isUsernameExist?: boolean | null };

export type IsEmailExistQueryQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type IsEmailExistQueryQuery = { __typename?: 'Query', isEmailExist?: boolean | null };


export const CreateUserWithEmailAndPasswordMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUserWithEmailAndPasswordMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpFormInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserWithEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}]}]}}]} as unknown as DocumentNode<CreateUserWithEmailAndPasswordMutationMutation, CreateUserWithEmailAndPasswordMutationMutationVariables>;
export const GetCustomUserTokenQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCustomUserTokenQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"googleToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInFormInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCustomUserToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"googleToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"googleToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}]}]}}]} as unknown as DocumentNode<GetCustomUserTokenQueryQuery, GetCustomUserTokenQueryQueryVariables>;
export const GetCurrentUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUserQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQueryQuery, GetCurrentUserQueryQueryVariables>;
export const IsUsernameExistQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUsernameExistQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUsernameExist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<IsUsernameExistQueryQuery, IsUsernameExistQueryQueryVariables>;
export const IsEmailExistQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsEmailExistQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailExist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<IsEmailExistQueryQuery, IsEmailExistQueryQueryVariables>;