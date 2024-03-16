"use client";

import React from "react";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useAuth } from "@/hooks/auth/auth";
import Skeleton from "./ui/skeleton";
import { selectAuth } from "@/redux/features/auth/authSlice";
import {
  Bell,
  Bookmark,
  Home,
  Mail,
  Search,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";

interface SideBarMenuI {
  icon: React.ReactNode;
  title: string;
  link: string;
}

export const sidebarMenuItems: SideBarMenuI[] = [
  {
    title: "Home",
    icon: <Home />,
    link: "/home",
  },
  {
    title: "Explore",
    icon: <Search />,
    link: "/search",
  },
  {
    title: "Messages",
    icon: <Mail />,
    link: "/messages",
  },
  {
    title: "Notifications",
    icon: <Bell />,
    link: "/notifications",
  },
  {
    title: "Bookmarks",
    icon: <Bookmark />,
    link: "/bookmarks",
  },
  {
    title: "Profile",
    icon: <User />,
    link: "/profile",
  },
];

const SideBar: React.FC = () => {
  const { data: auth, signOutAction } = useAuth(selectAuth);
  const { user, isUserLoading } = auth;

  return (
    <div className="col-span-3 sticky">
      <div className="h-screen flex flex-col justify-between pb-4 sticky top-0">
        <div>
          <div className="text-3xl w-fit p-4 rounded-full cursor-pointer transition-all hover:bg-zinc-900">
            <Link href="/home">
              <BsTwitter />
            </Link>
          </div>
          <div className="flex flex-col gap-6 mr-10">
            <div className="flex flex-col gap-2">
              {sidebarMenuItems.map((item) => {
                return (
                  <Link
                    key={item.title}
                    href={
                      item.link === "/profile"
                        ? `/profile/${user?.username}`
                        : item.link
                    }
                    className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
                  >
                    <span>{item.icon}</span>
                    <span className="text-xl">{item.title}</span>
                  </Link>
                );
              })}
            </div>
            <button className="bg-[#1D9BF0] w-full py-4 text-lg font-semibold rounded-full transition-all hover:bg-[#1993e6] active:scale-[0.95]">
              Tweet
            </button>
          </div>
        </div>
        {!isUserLoading ? (
          <div
            onClick={signOutAction}
            className="flex justify-between items-center cursor-pointer px-4 py-3 mr-2 transition-all rounded-full hover:bg-zinc-900"
          >
            <div className="flex gap-3 items-center">
              <Image
                src={user?.profileImageURL ? user.profileImageURL : ""}
                alt="user-image"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold">
                  {user ? user.firstName + " " + user.lastName : ""}
                </span>
                <span className="text-zinc-500">@{user?.username}</span>
              </div>
            </div>
            <AiOutlineEllipsis className="text-xl" />
          </div>
        ) : (
          <div className="flex justify-between items-center mr-2 px-4 py-3 rounded-full">
            <div className="flex gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col gap-2 justify-center">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-28 h-4" />
              </div>
            </div>
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
