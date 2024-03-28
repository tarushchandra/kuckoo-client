import FeedCard from "@/components/feed-card";
import Header from "@/components/header";
import SocialButton from "@/components/social-button";
import { useUser } from "@/hooks/auth/user";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const user = await useUser(username);

  return (
    <>
      <Header className="px-4 py-2">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </h1>
          <h2 className="text-sm text-zinc-500">0 Posts</h2>
        </div>
      </Header>
      <div className="relative">
        <div className="absolute -z-10 bg-zinc-700 w-full h-44" />
      </div>
      <div className="mt-20">
        <div className="flex flex-col gap-4 px-4 py-2 border-b border-zinc-700">
          <div className="flex justify-between items-end">
            <Image
              className="rounded-full top-28 left-4 border-4 border-black"
              src={user?.profileImageURL ? user.profileImageURL : ""}
              alt="user-image"
              width={140}
              height={140}
            />
            <SocialButton user={{ ...user, username }} className="px-4 py-2" />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <h2 className="text-zinc-500 text-sm">@{username}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <CalendarDays size={20} />
            <h2>Joined March 2024</h2>
          </div>
          <div className="text-zinc-500 text-sm flex gap-2">
            <Link href={`/profile/${username}/followers`}>
              <h3>
                <span className="font-bold text-white">
                  {user?.followers?.length}
                </span>{" "}
                Followers
              </h3>
            </Link>
            <Link href={`/profile/${username}/followings`}>
              <h3 className="cursor-pointer">
                <span className="font-bold text-white">
                  {user?.followings?.length}
                </span>{" "}
                Followings
              </h3>
            </Link>
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
