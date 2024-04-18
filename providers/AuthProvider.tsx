"use client";

import AppLoading from "@/components/ui/app-loading";
import { useAuth } from "@/hooks/auth";
import { selectAuth } from "@/lib/redux/features/auth/authSlice";
import { useRouter } from "@/hooks/router";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

/* 
  Handles 2 cases (2nd method works only on refreshing the page, not on route change)
  - When access token is not present (handled by AuthRoute component)
  - When access token has been altered (handled by signInAction)

  Successful redirection to /sign-in page
  - Handled cases:
    - When access token is deleted
      - if browser is refreshed
      - if user tries to change the pathName (authenticated route)
    - WHen access token is altered
      - if browser is refreshed

  - Unhandled cases:
    - When access token is altered
      - if user tries to change the pathName (authenticated route)

*/

interface AuthProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const { signInAction, getAccessToken } = useAuth();

  useEffect(() => {
    if (!getAccessToken()) return;
    signInAction();
  }, []);

  return <>{children}</>;
};

export const AuthRoute: React.FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const { data: auth, getAccessToken } = useAuth(selectAuth);
  const { isUserLoading, isUserAuthenticated } = auth;
  const pathName = usePathname();

  // This useEffect is protecting this route.
  useEffect(() => {
    if (isUserLoading || getAccessToken()) return;
    if (!getAccessToken() || !isUserAuthenticated) router.replace("/sign-in");
  }, [pathName]);

  // if (isUserLoading) return <>{children}</>;
  if (isUserLoading || !isUserAuthenticated) return <AppLoading />;
  return <>{children}</>;
};
