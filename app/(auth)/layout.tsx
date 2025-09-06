import LandingHeader from "@/components/landing-header";
import { GoogleProvider } from "@/providers/google-provider";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleProvider>
      <div className="h-screen w-screen flex flex-col">
        <LandingHeader className="border border-x-0 border-t-0 border-b border-zinc-800" />
        <div className="flex-1">{children}</div>
      </div>
    </GoogleProvider>
  );
}
