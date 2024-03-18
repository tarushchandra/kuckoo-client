"use client";

import { queryClient } from "@/clients/query";
import FeedCard from "@/components/feed-card";
import Skeleton from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/auth/auth";
import { useUser } from "@/hooks/auth/user";
import { selectUser } from "@/redux/features/auth/authSlice";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { data: sessionUser } = useAuth(selectUser);
  const profileUser = useUser(params.username);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    };
  }, [params.username]);

  return (
    <>
      <div className="relative">
        <div className="absolute -z-10 bg-zinc-700 w-full h-44" />
      </div>
      <div className="mt-20">
        <div className="flex flex-col gap-4 px-4 py-2 border-b border-zinc-700">
          <div className="flex justify-between items-end">
            {!profileUser ? (
              <Skeleton className="w-[140px] h-[140px] rounded-full" />
            ) : (
              <Image
                className="rounded-full top-28 left-4 border-4 border-black"
                src={
                  profileUser?.profileImageURL
                    ? profileUser.profileImageURL
                    : ""
                }
                alt="user-image"
                width={140}
                height={140}
              />
            )}
            {sessionUser?.username === params.username ? (
              <button className="font-semibold text-md bg-white text-black px-4 py-2 rounded-full transition-all hover:bg-zinc-200">
                Edit Profile
              </button>
            ) : (
              <button className="font-semibold text-md bg-white text-black px-4 py-2 rounded-full transition-all hover:bg-zinc-200">
                Follow
              </button>
            )}
          </div>
          {!profileUser ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-36 h-6" />
              <Skeleton className="w-28 h-4" />
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-bold">
                {profileUser?.firstName} {profileUser?.lastName}
              </h1>
              <h2 className="text-zinc-500 text-sm">@{params.username}</h2>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <CalendarDays size={20} />
            <h2>Joined March 2024</h2>
          </div>
          <div className="text-zinc-500 text-sm flex gap-2">
            <h1>
              <span className="font-bold text-white">20</span> Followers
            </h1>
            <h1>
              <span className="font-bold text-white">20</span> Followings
            </h1>
          </div>
        </div>
        <div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
      </div>
    </>
  );
}
