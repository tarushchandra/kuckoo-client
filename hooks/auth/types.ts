import { signInFormType } from "@/app/(auth)/sign-in/page";

export interface IsignInAction {
  user?: signInFormType;
  googleToken?: string;
}
