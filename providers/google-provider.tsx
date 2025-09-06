"use client";

import { useAuth } from "@/hooks/auth";
import { selectGoogleButton } from "@/lib/redux/features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

// GOCSPX - vu1i0qtrf5iVptjVlz0VjDBCziyg;

interface GoogleProviderProps {
  children: React.ReactNode;
}

export const GoogleProvider: React.FC<GoogleProviderProps> = ({ children }) => {
  const { updateGoogleButtonAction } = useAuth(selectGoogleButton);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      onScriptLoadSuccess={() => updateGoogleButtonAction()}
    >
      {children}
    </GoogleOAuthProvider>
  );
};
