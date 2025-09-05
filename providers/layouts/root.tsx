import React from "react";
import ProgressBarProvider from "../progress-bar-provider";
import { ReactQueryProvider } from "../react-query-provider";
import { ReduxProvider } from "../redux-provider";
import { AuthProvider } from "../auth-provider";
import { getTokensFromCookies } from "@/lib/actions/user";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export const RootLayoutProvider: React.FC<ProvidersProps> = async ({
  children,
}) => {
  const { accessToken, refreshToken } = await getTokensFromCookies();
  const hasAccessToken = accessToken ? true : false;
  const hasRefreshToken = refreshToken ? true : false;
  const hasToken = hasAccessToken || hasRefreshToken;

  return (
    <>
      <ProgressBarProvider>
        <ReactQueryProvider>
          <ReduxProvider>
            <AuthProvider hasToken={hasToken}>{children}</AuthProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </ProgressBarProvider>
      <Toaster />
    </>
  );
};

export default RootLayoutProvider;
