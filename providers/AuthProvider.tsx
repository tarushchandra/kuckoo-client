"use client";

import AppLoading from "@/components/ui/app-loading";
import { useAuth } from "@/hooks/auth/auth";
import { selectAuth } from "@/redux/features/auth/authSlice";
import { useRouter } from "@/hooks/router/router";
import React, { useEffect } from "react";

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

  useEffect(() => {
    if (isUserLoading || getAccessToken()) return;

    if (isUserAuthenticated) {
      router.replace("/home");
    } else {
      router.replace("/sign-in");
    }
  }, []);

  if (isUserLoading) return <>{children}</>;
  if (!isUserAuthenticated) return <AppLoading />;
  return <>{children}</>;
};

// interface IAuthProvider {
//   AccessProvider: (children: React.ReactNode) => React.ReactElement;
//   AuthRoute: (children: React.ReactNode) => React.ReactElement;
// }

// export const AuthProvider: React.FC = () => {
//   const { useAuthStore, useAuthDispatcher, getAccessToken } = useAuth();
//   const { signInAction } = useAuthDispatcher();

//   return {
//     AccessProvider: ({ children }: { children: React.ReactNode }) => {
//       useEffect(() => {
//         if (!getAccessToken()) return;
//         signInAction();
//       }, []);

//       return <>{children}</>;
//     },
//     AuthRoute: ({ children }: { children: React.ReactNode }) => {
//       const { isUserAuthenticated, isLoading } = useAuthStore();
//       const router = useRouter();

//       useEffect(() => {
//         if (getAccessToken()) return;
//         if (isLoading) return;

//         if (isUserAuthenticated) {
//           router.replace("/home");
//         } else {
//           router.replace("/auth");
//         }
//       }, []);

//       if (isLoading) return <h1>User is loading...</h1>;
//       if (!isUserAuthenticated) return <h1>User is not authenticated!!</h1>;
//       return <>{children}</>;
//     },
//   };
// };
