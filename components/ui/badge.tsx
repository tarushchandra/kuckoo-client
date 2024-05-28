import mergeClasses from "@/utils/mergeClasses";
import React from "react";

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={mergeClasses(
        "absolute top-0 right-0 w-[1.1rem] h-[1.1rem] flex justify-center items-center bg-[#1D9BF0] rounded-full text-xs font-bold",
        className
      )}
    >
      {children}
    </div>
  );
}
