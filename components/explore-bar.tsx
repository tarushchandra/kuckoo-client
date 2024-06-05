"use client";
import { Search } from "lucide-react";
import React from "react";
import RecommendedUsers from "./recommended-users";
import { usePathname } from "next/navigation";

const ExploreBar = () => {
  const path = usePathname();

  // if (path.includes("messages")) return;

  return (
    <div className="col-span-5">
      <div className="pt-2 flex flex-col gap-4 sticky top-0">
        <RecommendedUsers />
      </div>
    </div>
  );
};

export default ExploreBar;
