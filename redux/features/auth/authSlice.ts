import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signIn, signOut } from "./authThunks";
import { User } from "@/gql/graphql";
import { RootState } from "@/redux/store";

export type AuthStateValues =
  | IAuthState
  | IAuthState["user"]
  | IAuthState["isUserAuthenticated"]
  | IAuthState["isUserLoading"]
  | IAuthState["error"]
  | IAuthState["isGoogleButtonLoaded"];

export interface IAuthState {
  user: User | null;
  isUserAuthenticated: boolean;
  isUserLoading: boolean;
  error: string | null;
  isGoogleButtonLoaded: boolean;
}

const initialState: IAuthState = {
  user: null,
  isUserAuthenticated: false,
  isUserLoading: false,
  error: null,
  isGoogleButtonLoaded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateGoogleButton: (state) => {
      state.isGoogleButtonLoaded = true;
    },
  },
  extraReducers: (builder) => {
    // Sign In Action
    builder
      .addCase(signIn.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload;
        state.isUserAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.payload;
      });

    // Sign Out Action
    builder
      .addCase(signOut.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isUserLoading = false;
        state.user = null;
        state.isUserAuthenticated = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectAuth = (store: RootState) => store.auth;
export const selectGoogleButton = (store: RootState) =>
  store.auth.isGoogleButtonLoaded;

export const { updateGoogleButton } = authSlice.actions;
export default authSlice.reducer;
