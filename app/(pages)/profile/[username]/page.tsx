import FeedCard from "@/components/post-card";
import Header from "@/components/header";
import MutualFollowers from "@/components/mutual-followers";
import SocialButtons from "@/components/social-buttons";
import PostsFeed from "@/components/posts";
import { getUser } from "@/services/user";
import { CalendarDays } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import UserPosts from "@/components/user-posts";

export interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const user = await getUser(username);
  const dateJoined = dayjs(Number(user.createdAt));
  const formattedDate = dateJoined.format("MMMM D, YYYY");

  return (
    <>
      <Header className="px-4 py-2">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </h1>
          <h2 className="text-sm text-zinc-500">{user.postsCount} Posts</h2>
        </div>
      </Header>
      <div className="relative">
        <div className="absolute -z-10 bg-zinc-700 w-full h-44" />
      </div>
      <div className="mt-20">
        <div className="flex flex-col gap-4 px-4 py-2 border-b border-zinc-800">
          <div className="flex justify-between items-end ">
            <div className="w-[140px] h-[140px] rounded-full">
              <Image
                className="rounded-full top-28 left-4 border-4 border-black object-cover"
                src={user?.profileImageURL ? user.profileImageURL : ""}
                alt="user-image"
                width={140}
                height={140}
              />
            </div>
            <SocialButtons
              targetUser={{ ...user, username }}
              className="px-4 py-2 text-md"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <h2 className="text-zinc-500 text-sm">@{username}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <CalendarDays size={20} />
            <h2>Joined {formattedDate}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-zinc-500 text-sm flex gap-2">
              <Link href={`/profile/${username}/followers`}>
                <h3>
                  <span className="font-bold text-white">
                    {user.followersCount}
                  </span>{" "}
                  Followers
                </h3>
              </Link>
              <Link href={`/profile/${username}/followings`}>
                <h3 className="cursor-pointer">
                  <span className="font-bold text-white">
                    {user.followingsCount}
                  </span>{" "}
                  Followings
                </h3>
              </Link>
            </div>
            <MutualFollowers myUsername={username} />
          </div>
        </div>
        <UserPosts user={{ ...user, username }} />
      </div>
    </>
  );
}
