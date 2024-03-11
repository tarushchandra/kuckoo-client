import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { signIn, signOut } from "@/redux/features/auth/authThunks";
import { isClientSideRenderedPage } from "@/utils/isClient";
import {
  AuthStateValues,
  updateGoogleButton,
} from "@/redux/features/auth/authSlice";
import { useRouter } from "@/hooks/router/router";
import { IsignInAction } from "./types";

export const useAuth = <T extends AuthStateValues>(
  selector?: (store: RootState) => T
) => {
  const data = selector && useAppSelector(selector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signInAction = (payload?: IsignInAction) => {
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

  const getAccessToken = () =>
    isClientSideRenderedPage ? localStorage.getItem("__access__token") : null;

  return {
    data: data as T,
    signInAction,
    signOutAction,
    updateGoogleButtonAction,
    getAccessToken,
  };
};

// export const useAuth = () => {
//   return {
//     useAuthStore: <T extends AuthStateValues>(
//       selector: (store: RootState) => T
//     ): T => {
//       const data = useAppSelector(selector);
//       return data as T;
//     },
//     useAuthDispatcher: () => {
//       const router = useRouter();
//       const dispatch = useAppDispatch();

//       const signInAction = (payload: IsignInAction) => {
//         dispatch(signIn(payload));
//         router.replace("/home");
//       };
//       const signOutAction = () => {
//         dispatch(signOut());
//         router.replace("/sign-in");
//       };
//       const updateGoogleButtonAction = () => {
//         dispatch(updateGoogleButton());
//       };

//       return { signInAction, signOutAction, updateGoogleButtonAction };
//     },
//     getAccessToken: () =>
//       isClientSideRenderedPage ? localStorage.getItem("__access__token") : null,
//   };
// };
