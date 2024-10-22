"use client";
import { Search } from "lucide-react";
import React from "react";
import RecommendedUsers from "./recommended-users";
import { usePathname } from "next/navigation";

const ExploreBar = ({ className }: { className: string }) => {
  const path = usePathname();

  // if (path.includes("messages")) return;

  return (
    <div className={className}>
      <div className="pt-2 flex flex-col gap-4 sticky top-0">
        <RecommendedUsers />
      </div>
    </div>
  );
};

export default ExploreBar;
