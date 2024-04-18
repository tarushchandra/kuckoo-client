"use client";
import Header from "@/components/header";
import HeaderOptions from "@/components/header-options";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import React from "react";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionUser } = useAuth(selectUser);
  return (
    <>
      <Header>
        <h1 className="font-semibold text-xl p-4">Explore</h1>
        <HeaderOptions username={sessionUser?.username!} />
      </Header>
      {children}
    </>
  );
}
