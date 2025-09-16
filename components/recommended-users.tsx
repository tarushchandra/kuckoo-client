"use client";
import { useRecommendedUsers } from "@/hooks/queries/user";
import UserCard from "./user-card";
import UserCardLoading from "./ui/user-card-loading";
import Link from "next/link";

export default function RecommendedUsers(props: any) {
  const users = useRecommendedUsers();

  return (
    <div className="bg-zinc-900 w-full rounded-2xl py-3 flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-center">People you may know</h1>
      <div className="flex flex-col gap-1">
        {users ? (
          users.length > 0 ? (
            <>
              {users.map((user: any) => (
                <UserCard
                  key={user?.id}
                  user={user!}
                  className="px-4 py-2 hover:bg-zinc-800"
                  buttonClassName="px-3 py-2 text-sm"
                />
              ))}
              <Link
                href="/explore/suggestions"
                className="text-sm px-4 text-primary cursor-pointer hover:underline"
              >
                Show more
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-center text-zinc-500">
                Follow someone to start getting suggestions from us
              </h1>
              <Link
                href="/explore/all-users"
                className="text-sm px-4 text-primary-500 cursor-pointer hover:underline"
              >
                Explore users
              </Link>
            </>
          )
        ) : (
          Array.from({ length: 4 }, (_, index) => (
            <UserCardLoading
              key={index}
              className="px-4 py-2"
              skeletonClassName="bg-zinc-800"
              nameClassName="w-32"
              userNameClassName="w-24"
            />
          ))
        )}
      </div>
    </div>
  );
}
