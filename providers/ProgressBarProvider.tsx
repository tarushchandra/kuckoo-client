"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import * as NProgress from "nprogress";

interface ProgressProviderProps {
  children: React.ReactNode;
}

const ProgressBarProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathName, searchParams]);

  return <>{children}</>;
};

export default ProgressBarProvider;
