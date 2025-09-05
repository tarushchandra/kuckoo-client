"use client";
import DefaultPageLayout from "@/layouts/pages/default";
import MessagesPagesLayout from "@/layouts/pages/messages";
import { usePathname } from "next/navigation";
import React from "react";

const PagesLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const isMessagesPathOpened = path?.includes("messages");

  if (isMessagesPathOpened)
    return <MessagesPagesLayout>{children}</MessagesPagesLayout>;
  return <DefaultPageLayout>{children}</DefaultPageLayout>;
};

export default PagesLayoutProvider;
