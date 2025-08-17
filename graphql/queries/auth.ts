import { graphql } from "@/gql";

export const getTokensQuery = graphql(/* GraphQL */ `
  query GetTokensQuery($googleToken: String, $user: SignInFormInput) {
    getTokens(googleToken: $googleToken, user: $user)
  }
`);

export const verifyRefreshTokenQuery = graphql(/* GraphQL */ `
  query VerifyRefreshTokenQuery {
    verifyRefreshToken
  }
`);
