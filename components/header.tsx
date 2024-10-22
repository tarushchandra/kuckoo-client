import mergeClasses from "@/utils/mergeClasses";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

// sticky top-0

const Header: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <>
      <div />
      <div
        className={mergeClasses(
          "sticky top-0 z-10 border-b border-zinc-800 bg-gradient-to-b from-black to-transparent backdrop-blur-md",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Header;
