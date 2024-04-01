import mergeClasses from "@/utils/mergeClasses";
import React, { useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div
      className={mergeClasses(
        "border-y border-t-0 border-zinc-800 sticky top-0 bg-gradient-to-b from-black to-transparent backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Header;
