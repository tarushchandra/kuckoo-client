import { queryClient } from "@/lib/clients/react-query";
import { User } from "@/gql/graphql";
import { IsignInAction } from "@/hooks/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getSessionUser } from "@/services/user";
import { deleteTokensAndRedirectToSignInPage } from "@/lib/actions/auth";
import { deleteTokens, getTokens } from "@/services/auth";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload?: IsignInAction) => {
    try {
      // store both the tokens in cookies.
      if (payload) await getTokens(payload);

      // get session user
      await queryClient.invalidateQueries({ queryKey: ["session-user"] });
      const { user } = await getSessionUser();
      if (!user) await deleteTokensAndRedirectToSignInPage();

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
    await deleteTokens();
    await queryClient.invalidateQueries({ queryKey: ["session-user"] });
  } catch (err) {
    throw err;
  }
});
