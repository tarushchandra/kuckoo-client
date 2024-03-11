"use client";
// backdrop-blur-lg
import React, { useState } from "react";

const Header: React.FC = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const totalTabs = ["For You", "Following"];

  return (
    <div className=" flex flex-col pt-2 gap-2 font-semibold border-y border-t-0 border-zinc-700 sticky top-0 bg-gradient-to-b from-black to-transparent backdrop-blur-md">
      <h1 className="text-xl px-4 py-2">Home</h1>
      {/* <div className="flex text-sm">
        {totalTabs.map((tab, index) => {
          return (
            <div
              key={tab}
              onClick={() => setCurrentTabIndex(index)}
              className={
                currentTabIndex === index
                  ? "w-full py-4 flex justify-center items-center cursor-pointer hover:bg-zinc-900 border border-t-0 border-x-0 border-[#1D9BF0]"
                  : "w-full py-4 flex justify-center items-center cursor-pointer hover:bg-zinc-900"
              }
            >
              <h1>{tab}</h1>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Header;

// border border-t-0 border-x-0 border-[#1D9BF0]
