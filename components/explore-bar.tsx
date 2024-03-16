"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import UserCard from "./user-card";
import { useAllUsers } from "@/hooks/auth/user";
import { useAuth } from "@/hooks/auth/auth";
import { selectUser } from "@/redux/features/auth/authSlice";

const ExploreBar = () => {
  const { data: user } = useAuth(selectUser);
  const users = useAllUsers();

  return (
    <div className="col-span-3">
      <div className=" flex flex-col gap-4 sticky top-0">
        <div className="relative w-full mt-2">
          <Search
            size={22}
            className="text-zinc-500 absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search..."
            className=" w-full rounded-full bg-zinc-900 px-10 py-2 border-[0.01rem] border-zinc-800 focus:outline-none focus:border-[#1D9BF0] focus:ring-1"
          />
        </div>
        <div className="bg-zinc-900 w-full rounded-2xl p-4 flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center">
            People you may know
          </h1>
          <div className="flex flex-col gap-5">
            {users?.map((u) => {
              if (user?.username === u?.username) return;
              return <UserCard key={u?.id} user={u} />;
            })}
            <h1 className="text-sm text-[#1D9BF0] cursor-pointer hover:underline">
              Show more
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreBar;
