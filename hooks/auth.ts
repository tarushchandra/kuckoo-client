import { RootState } from "@/lib/redux/store";
import { useAppDispatch, useAppSelector } from "./redux";
import { signIn, signOut } from "@/lib/redux/features/auth/authThunks";
import { isClientSideRenderedPage } from "@/utils/isClient";
import {
  AuthStateValues,
  updateGoogleButton,
} from "@/lib/redux/features/auth/authSlice";
import { useRouter } from "@/hooks/router";
import { usePathname } from "next/navigation";
import { getSessionUser } from "@/services/user";
import { signInFormType } from "@/app/(auth)/sign-in/page";

interface IsignInAction {
  user?: signInFormType;
  googleToken?: string;
}

export const useAuth = <T extends AuthStateValues>(
  selector?: (store: RootState) => T
) => {
  const data = selector && useAppSelector(selector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  const signInAction = async (payload?: IsignInAction) => {
    await dispatch(signIn(payload));
    redirectToRouteBasedOnAuthStatus();
  };

  const signOutAction = () => {
    dispatch(signOut());
    router.replace("/sign-in");
  };

  const updateGoogleButtonAction = () => {
    dispatch(updateGoogleButton());
  };

  // -------------------------------------------------------------------------

  const redirectToRouteBasedOnAuthStatus = async () => {
    const { user } = await getSessionUser();
    if (!user && pathName !== "/sign-in") return router.replace("/sign-in");
    if (!user) return;
    if (pathName === "/sign-in" || pathName === "/sign-up" || pathName === "/")
      return router.replace("/home");
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
