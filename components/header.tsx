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
          "border-y border-t-0 sticky top-0 border-zinc-800 bg-gradient-to-b from-black to-transparent backdrop-blur-md",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Header;
