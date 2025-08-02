"use client";
import { useAuth } from "@/hooks/auth";
import { selectAuth } from "@/lib/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import AppLoading from "@/components/ui/app-loading";
import { get } from "http";
import { getTokensFromCookies } from "@/lib/actions/user";

interface AuthProps {
  children: React.ReactNode;
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
}

export const AuthProvider: React.FC<AuthProps> = ({
  children,
  hasAccessToken,
  hasRefreshToken,
}) => {
  const { data: auth, signInAction } = useAuth(selectAuth);
  const { isUserAuthenticated } = auth;

  // handle initial sign in when access token is present
  useEffect(() => {
    if (hasAccessToken) signInAction();
  }, []);

  if ((hasAccessToken || hasRefreshToken) && !isUserAuthenticated)
    return <AppLoading />;
  return <>{children}</>;
};
