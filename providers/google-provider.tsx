"use client";

import { useAuth } from "@/hooks/auth";
import { selectGoogleButton } from "@/lib/redux/features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

interface GoogleProviderProps {
  children: React.ReactNode;
}

export const GoogleProvider: React.FC<GoogleProviderProps> = ({ children }) => {
  const { updateGoogleButtonAction } = useAuth(selectGoogleButton);

  return (
    <GoogleOAuthProvider
      clientId="79601134659-lvunefks7ulgh3il028r8lgua5h4bg58.apps.googleusercontent.com"
      onScriptLoadSuccess={() => updateGoogleButtonAction()}
    >
      {children}
    </GoogleOAuthProvider>
  );
};
