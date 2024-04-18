"use client";
import UserCardLoading from "@/components/ui/user-card-loading";
import UserCard from "@/components/user-card";
import { useRecommendedUsers } from "@/hooks/queries/user";
import { queryClient } from "@/lib/clients/query";
import React, { useEffect } from "react";

export default function AllUsersPage() {
  const users = useRecommendedUsers();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["recommended-users"] });
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

  if (users.length === 0)
    return (
      <div className="px-4 py-4 flex flex-col gap-2">
        <h1 className="text-center text-xl font-medium">No Suggestions</h1>
      </div>
    );

  return (
    <>
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
    </>
  );
}
