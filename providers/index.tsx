import React from "react";
import ProgressBarProvider from "./ProgressBarProvider";
import { ReactQueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";
import { AuthProvider } from "./AuthProvider";
import { getTokensFromCookies } from "@/lib/actions/user";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = async ({ children }) => {
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

export default Providers;
