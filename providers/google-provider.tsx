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
      clientId="656345855159-r0rql77b33jt71397q1j6maguj610nrt.apps.googleusercontent.com"
      onScriptLoadSuccess={() => updateGoogleButtonAction()}
    >
      {children}
    </GoogleOAuthProvider>
  );
};
