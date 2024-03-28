"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
