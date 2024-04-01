"use client";

import { store } from "@/lib/redux/store";
import React from "react";
import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
