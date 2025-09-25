"use client";
import { useAuth } from "@/hooks/auth";
import { selectAuth } from "@/lib/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import AppLoading from "@/components/ui/app-loading";

interface AuthProps {
  children: React.ReactNode;
  isTokenInitiallyPresent: boolean;
}

export const AuthProvider: React.FC<AuthProps> = ({
  children,
  isTokenInitiallyPresent,
}) => {
  const { signInAction } = useAuth(selectAuth);
  const [isInitialSignInAttempted, setIsInitialSignInAttempted] =
    useState(false);

  const handleInitialSignIn = async () => {
    try {
      await signInAction();
    } finally {
      setIsInitialSignInAttempted(true);
    }
  };

  // handle initial sign in when access token or refresh token is present
  useEffect(() => {
    if (isTokenInitiallyPresent) handleInitialSignIn();
  }, []);

  // show loading screen only when token is initially present and initial sign in is not yet attempted
  if (isTokenInitiallyPresent && !isInitialSignInAttempted)
    return <AppLoading />;

  // render children when no token is present (for public routes) or when initial sign in is attempted (for private routes)
  return <>{children}</>;
};
