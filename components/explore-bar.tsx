import { Search } from "lucide-react";
import React from "react";
import RecommendedUsers from "./recommended-users";

const ExploreBar = () => {
  return (
    <div className="col-span-3">
      <div className="mt-2 flex flex-col gap-4 sticky top-0">
        {/* <div className="relative w-full mt-1">
          <Search
            size={22}
            className="text-zinc-500 absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search..."
            className=" w-full rounded-full bg-zinc-900 px-10 py-2 border-[0.01rem] border-zinc-800 focus:outline-none focus:border-[#1D9BF0] focus:ring-1"
          />
        </div> */}
        <RecommendedUsers />
      </div>
    </div>
  );
};

export default ExploreBar;
