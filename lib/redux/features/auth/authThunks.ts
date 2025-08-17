import { queryClient } from "@/lib/clients/query";
import { User } from "@/gql/graphql";
import { IsignInAction } from "@/hooks/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getSessionUser } from "@/services/user";
import { deleteTokensFromCookies } from "@/lib/actions/user";
import { getTokens } from "@/services/auth";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload?: IsignInAction) => {
    try {
      // store both the tokens in cookies.
      if (payload) await getTokens(payload);

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
    throw err;
  }
});
