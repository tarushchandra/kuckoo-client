"use client";
import { useAuth } from "@/hooks/auth/auth";
import { selectAuth, selectUser } from "@/redux/features/auth/authSlice";
import mergeClasses from "@/utils/mergeClasses";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Skeleton from "./ui/skeleton";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div
      className={mergeClasses(
        "p-2 border-y border-t-0 border-zinc-700 sticky top-0 z-10 bg-gradient-to-b from-black to-transparent backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
};

const Header: React.FC = () => {
  const pathName = usePathname();
  const { data: auth } = useAuth(selectAuth);
  const { user, isUserLoading } = auth;

  if (pathName === "/home") {
    return (
      <Wrapper>
        <h1 className="text-xl font-semibold px-4 py-2">Home</h1>
      </Wrapper>
    );
  }

  if (pathName.includes("/profile/")) {
    return (
      <Wrapper className="flex items-center gap-6 px-4">
        <ArrowLeft />
        {isUserLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-36 h-6" />
            <Skeleton className="w-14 h-4" />
          </div>
        ) : (
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h1>
            <h2 className="text-sm text-zinc-500">0 Posts</h2>
          </div>
        )}
      </Wrapper>
    );
  }
};

export default Header;

// border border-t-0 border-x-0 border-[#1D9BF0]
