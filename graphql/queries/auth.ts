import { graphql } from "@/gql";

export const setAuthCookiesQuery = graphql(/* GraphQL */ `
  query SetAuthCookiesQuery($googleToken: String, $user: SignInFormInput) {
    setAuthCookies(googleToken: $googleToken, user: $user)
  }
`);

export const verifyRefreshTokenQuery = graphql(/* GraphQL */ `
  query VerifyRefreshTokenQuery {
    verifyRefreshToken
  }
`);

export const deleteAuthCookiesQuery = graphql(/* GraphQL */ `
  query DeleteAuthCookiesQuery {
    deleteAuthCookies
  }
`);
