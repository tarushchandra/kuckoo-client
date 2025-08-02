import { RootState } from "@/lib/redux/store";
import { useAppDispatch, useAppSelector } from "./redux";
import { signIn, signOut } from "@/lib/redux/features/auth/authThunks";
import {
  AuthStateValues,
  updateGoogleButton,
} from "@/lib/redux/features/auth/authSlice";
import { signInFormType } from "@/app/(auth)/sign-in/page";
import { useRouter } from "@/hooks/router";
import { usePathname } from "next/navigation";

export interface IsignInAction {
  user?: signInFormType;
  googleToken?: string;
}

export const useAuth = <T extends AuthStateValues>(
  selector: (store: RootState) => T
) => {
  const data = selector ? useAppSelector(selector) : null;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signInAction = async (payload?: IsignInAction) => {
    // handling initial sign in when access token is present
    if (!payload) return dispatch(signIn());

    // handling sign in when user is clicking on sign in button
    await dispatch(signIn(payload));
    router.replace("/home");
  };

  const signOutAction = async () => {
    await dispatch(signOut());
    router.replace("/sign-in");
  };

  const updateGoogleButtonAction = () => dispatch(updateGoogleButton());

  return {
    data: data as T,
    signInAction,
    signOutAction,
    updateGoogleButtonAction,
  };
};
