import mergeClasses from "@/utils/mergeClasses";
import React from "react";

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={mergeClasses(
        "bg-zinc-900 animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  );
}
