"use client";
import UserCardLoading from "@/components/ui/user-card-loading";
import UserCard from "@/components/user-card";
import { useAllUsers } from "@/hooks/queries/user";
import { queryClient } from "@/lib/clients/react-query";
import React, { useEffect } from "react";

export default function AllUsersPage() {
  const users = useAllUsers();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["all-users"] });
    };
  }, []);

  if (!users) {
    return (
      <div className="px-4 py-4 flex flex-col gap-2">
        {Array.from({ length: 11 }, (_, index) => (
          <UserCardLoading
            key={index}
            className="px-10 py-3"
            nameClassName="w-40"
            userNameClassName="w-32"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-4 flex flex-col gap-2">
        {users.map((user: any) => {
          return (
            <UserCard
              key={user.id}
              className="px-10 py-3 rounded-lg hover:bg-zinc-900"
              buttonClassName="px-4 py-2"
              user={user}
            />
          );
        })}
      </div>
    </>
  );
}
