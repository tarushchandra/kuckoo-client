"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProgressProviderProps {
  children: React.ReactNode;
}

const ProgressBarProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  return (
    <>
      <ProgressBar color="#1D9BF0" />
      {children}
    </>
  );
};

export default ProgressBarProvider;
