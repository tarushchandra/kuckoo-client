"use client";
import Header from "@/components/header";
import UserCardLoading from "@/components/ui/user-card-loading";
import UserCard from "@/components/user-card";
import { useSearchUsers } from "@/hooks/services/user";
import { getUsers } from "@/services/user";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const { users, isUsersLoading } = useSearchUsers(getUsers, searchText);

  return (
    <div>
      <Header className="px-4 py-4 flex">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full rounded-s-full bg-zinc-950 px-4 py-2 border-[0.01rem] border-zinc-800 focus:outline-none focus:border-primary focus:ring-1"
        />
        <button className="bg-zinc-900 px-6 border-l-0 border-[0.01rem] border-zinc-800 rounded-e-full ">
          <Search size={22} className="text-zinc-400" />
        </button>
      </Header>
      <div className="px-4 py-4 flex flex-col gap-2">
        {/* <h1 className="text-center text-xl font-medium">No recent searches</h1> */}

        {!isUsersLoading ? (
          users.length > 0 ? (
            users.map((user: any) => (
              <UserCard
                key={user.id}
                className="px-2 py-3 rounded-lg hover:bg-zinc-950"
                buttonClassName="px-4 py-2"
                user={user}
              />
            ))
          ) : (
            <h1 className="text-center font-semibold text-sm">
              No Users found
            </h1>
          )
        ) : (
          Array.from({ length: 10 }, (_, index) => (
            <UserCardLoading
              key={index}
              className="px-4 py-3"
              skeletonClassName="bg-zinc-900"
              nameClassName="w-32"
              userNameClassName="w-24"
            />
          ))
        )}
      </div>
    </div>
  );
}
