import { graphqlClient } from "@/clients/graphql";
import { queryClient } from "@/clients/query";
import { User } from "@/gql/graphql";
import { getCustomUserTokenQuery } from "@/graphql/queries/user";
import { IsignInAction } from "@/hooks/auth/types";
import { useSessionUser } from "@/hooks/auth/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getCustomUserToken = async (payload: IsignInAction) => {
  if (payload.googleToken) {
    const { getCustomUserToken } = await graphqlClient.request(
      getCustomUserTokenQuery,
      { googleToken: payload.googleToken }
    );
    return getCustomUserToken;
  } else {
    const { getCustomUserToken } = await graphqlClient.request(
      getCustomUserTokenQuery,
      { user: payload.user }
    );
    return getCustomUserToken;
  }
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload?: IsignInAction) => {
    const access_token = localStorage.getItem("__access__token");

    try {
      if (!access_token) {
        if (!payload) throw new Error("Payload not found");

        toast.loading("Please wait...", { id: "signin-loading" });

        const customUserToken = await getCustomUserToken(payload);
        if (!customUserToken)
          throw new Error("Custom token not recieved from the server");
        localStorage.setItem("__access__token", customUserToken);

        const { user } = await useSessionUser();
        toast.success(`Welcome ${user?.firstName}!`, { id: "signin-loading" });
        return user;
      }

      const { user } = await useSessionUser();
      return user as User;
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
      return err;
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    toast.loading("Please wait...", { id: "signout-loading" });
    localStorage.removeItem("__access__token");
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    toast.success("Signed Out", { id: "signout-loading" });
  } catch (err) {
    console.log(err);
    toast.error("Server Error");
    return err;
  }
});
