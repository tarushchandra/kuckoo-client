import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { User } from "@/gql/graphql";
import { getCustomUserTokenQuery } from "@/graphql/queries/user";
import { IsignInAction } from "@/hooks/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getSessionUser } from "@/services/user";
import { deleteTokensFromCookies } from "@/lib/actions/user";

export const getCustomUserToken = async (payload: IsignInAction) => {
  try {
    let customUserToken;
    if (payload.googleToken) {
      const { getCustomUserToken } = await graphqlClient.request(
        getCustomUserTokenQuery,
        { googleToken: payload.googleToken }
      );
      customUserToken = getCustomUserToken;
    } else {
      const { getCustomUserToken } = await graphqlClient.request(
        getCustomUserTokenQuery,
        { user: payload.user }
      );
      customUserToken = getCustomUserToken;
    }
    if (!customUserToken)
      throw new Error("Custom token not recieved from the server");
    return customUserToken;
  } catch (err: any) {
    const errorMessage = err.response.errors[0].message;
    throw new Error(errorMessage);
  }
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload?: IsignInAction) => {
    try {
      // set custom user token as a cookie
      if (payload) await getCustomUserToken(payload);

      // get session user
      await queryClient.invalidateQueries({ queryKey: ["session-user"] });
      const { user } = await getSessionUser();
      if (!user) throw new Error("You are not authenticated");

      // update the redux store
      return user as User;
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    await deleteTokensFromCookies();
    await queryClient.invalidateQueries({ queryKey: ["session-user"] });
  } catch (err) {
    console.log(err);
    toast.error("Server Error");
    return err;
  }
});
