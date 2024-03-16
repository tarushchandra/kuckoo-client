import { graphqlClient } from "@/clients/graphql";
import { queryClient } from "@/clients/query";
import { User } from "@/gql/graphql";
import { getCustomUserTokenQuery } from "@/graphql/queries/user";
import { IsignInAction } from "@/hooks/auth/types";
import { useSessionUser } from "@/hooks/auth/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getCustomUserToken = async (payload: IsignInAction) => {
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
    const access_token = localStorage.getItem("__access__token");

    try {
      if (!access_token) {
        if (!payload) throw new Error("Payload not found");
        const customUserToken = await getCustomUserToken(payload);
        localStorage.setItem("__access__token", customUserToken);
      }
      await queryClient.invalidateQueries({ queryKey: ["session-user"] });

      const { user } = await useSessionUser();
      if (!user) {
        localStorage.removeItem("__access__token");
        throw new Error("You are not authenticated");
      }

      return user as User;
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    localStorage.removeItem("__access__token");
    await queryClient.invalidateQueries({ queryKey: ["session-user"] });
  } catch (err) {
    console.log(err);
    toast.error("Server Error");
    return err;
  }
});
