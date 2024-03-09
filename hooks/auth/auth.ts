import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { signIn, signOut } from "@/redux/features/auth/authThunks";
import { isClientSideRenderedPage } from "@/utils/isClient";
import {
  AuthStateValue,
  updateGoogleButton,
} from "@/redux/features/auth/authSlice";
import { useRouter } from "@/hooks/router/router";
import { signInFormType } from "@/app/(auth)/sign-in/page";
import { IsignInAction } from "./types";

export const useAuth = () => {
  return {
    useAuthStore: (selector: (store: RootState) => AuthStateValue) => {
      const data = useAppSelector(selector);
      if (typeof data === "object") return { ...data };
      return data;
    },
    useAuthDispatcher: () => {
      const router = useRouter();
      const dispatch = useAppDispatch();

      const signInAction = (payload: IsignInAction) => {
        dispatch(signIn(payload));
        router.replace("/home");
      };
      const signOutAction = () => {
        dispatch(signOut());
        router.replace("/sign-in");
      };
      const updateGoogleButtonAction = () => {
        dispatch(updateGoogleButton());
      };

      return { signInAction, signOutAction, updateGoogleButtonAction };
    },
    getAccessToken: () =>
      isClientSideRenderedPage ? localStorage.getItem("__access__token") : null,
  };
};
