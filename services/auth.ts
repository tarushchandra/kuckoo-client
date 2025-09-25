import {
  deleteTokensQuery,
  getTokensQuery,
  verifyRefreshTokenQuery,
} from "@/graphql/queries/auth";
import { IsignInAction } from "@/hooks/auth";
import { graphqlClient } from "@/lib/clients/graphql";

export const getTokens = async (payload: IsignInAction) => {
  const variables = payload.googleToken
    ? { googleToken: payload.googleToken }
    : { user: payload.user };

  try {
    const { getTokens } = await graphqlClient.request(
      getTokensQuery,
      variables
    );
    if (!getTokens) throw new Error("Tokens are not recieved from the server");
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

export const deleteTokens = async () => {
  try {
    const { deleteTokens } = await graphqlClient.request(deleteTokensQuery);
    if (!deleteTokens)
      throw new Error("Tokens are not deleted from the server");
  } catch (err) {
    throw err;
  }
};
