"use client";
import { useAuth } from "@/hooks/auth";
import { selectAuth } from "@/lib/redux/features/auth/authSlice";
import { useEffect } from "react";
import AppLoading from "@/components/ui/app-loading";

interface AuthProps {
  children: React.ReactNode;
  hasToken: boolean;
}

export const AuthProvider: React.FC<AuthProps> = ({ children, hasToken }) => {
  const { data: auth, signInAction } = useAuth(selectAuth);
  const { isUserAuthenticated } = auth;

  // handle initial sign in when access token or refresh token is present
  useEffect(() => {
    if (hasToken) signInAction();
  }, []);

  if (hasToken && !isUserAuthenticated) return <AppLoading />;
  return <>{children}</>;
};
