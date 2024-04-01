"use client";
import Header from "@/components/header";
import UserCardLoading from "@/components/ui/user-card-loading";
import UserCard from "@/components/user-card";
import { useAllUsers } from "@/hooks/auth/user";
import { queryClient } from "@/lib/clients/query";
import { Search } from "lucide-react";
import React, { useEffect } from "react";

export default function SearchPage() {
  const users = useAllUsers();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["all-users"] });
    };
  }, []);

  return (
    <div>
      <Header className="px-4 py-4 flex">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-s-full bg-zinc-950 px-4 py-2 border-[0.01rem] border-zinc-800 focus:outline-none focus:border-[#1D9BF0] focus:ring-1"
        />
        <button className="bg-zinc-900 px-6 border-l-0 border-[0.01rem] border-zinc-800 rounded-e-full ">
          <Search size={22} className="text-zinc-400" />
        </button>
      </Header>
      {users ? (
        <div className="px-4 py-4 flex flex-col gap-2">
          {users.map((user: any) => {
            return (
              <UserCard
                key={user?.id}
                className="px-10 py-3 rounded-lg hover:bg-zinc-900"
                buttonClassName="px-4 py-2"
                user={user}
              />
            );
          })}
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-2">
          {Array.from({ length: 12 }, (_, index) => (
            <UserCardLoading
              key={index}
              className="px-10 py-3"
              nameClassName="w-40"
              userNameClassName="w-32"
            />
          ))}
        </div>
      )}
    </div>
  );
}
