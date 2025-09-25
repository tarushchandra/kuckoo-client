import {
  deleteAuthCookiesQuery,
  setAuthCookiesQuery,
  verifyRefreshTokenQuery,
} from "@/graphql/queries/auth";
import { IsignInAction } from "@/hooks/auth";
import { graphqlClient } from "@/lib/clients/graphql";

export const setAuthCookies = async (payload: IsignInAction) => {
  const variables = payload.googleToken
    ? { googleToken: payload.googleToken }
    : { user: payload.user };

  try {
    const { setAuthCookies } = await graphqlClient.request(
      setAuthCookiesQuery,
      variables
    );
    if (!setAuthCookies)
      throw new Error("Tokens are not recieved from the server");
  } catch (err: any) {
    throw err;
  }
};

export const verifyRefreshToken = async () => {
  try {
    const { verifyRefreshToken } = await graphqlClient.baseRequest(
      verifyRefreshTokenQuery
    );
    return { isRefreshTokenValid: verifyRefreshToken };
  } catch (err) {
    throw err;
  }
};

export const deleteAuthCookies = async () => {
  try {
    const { deleteAuthCookies } = await graphqlClient.request(
      deleteAuthCookiesQuery
    );
    if (!deleteAuthCookies)
      throw new Error("Tokens are not deleted from the server");
  } catch (err) {
    throw err;
  }
};
