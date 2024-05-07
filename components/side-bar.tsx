"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useAuth } from "@/hooks/auth";
import Skeleton from "./ui/skeleton";
import { selectAuth, selectUser } from "@/lib/redux/features/auth/authSlice";
import { Bell, Bookmark, Home, Mail, Search, User } from "lucide-react";
import Link from "next/link";
import PostTweetModal, { MODE } from "./post-tweet-modal";
import SignOutModal from "./signout-modal";

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
    title: "Search",
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
  const { data: sessionUser } = useAuth(selectUser);

  const [isCreateTweetModalOpen, setIsCreateTweetModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <div className="col-span-3">
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
                        ? `/profile/${sessionUser?.username}`
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
            <button
              onClick={() => setIsCreateTweetModalOpen(true)}
              className="bg-[#1D9BF0] w-full py-4 text-lg font-semibold rounded-full transition-all hover:bg-[#1993e6] active:scale-[0.95]"
            >
              Tweet
            </button>
          </div>
        </div>

        <div
          onClick={() => setIsSignOutModalOpen(true)}
          className="flex justify-between items-center cursor-pointer px-4 py-3 mr-2 transition-all rounded-full hover:bg-zinc-900"
        >
          <div className="flex gap-3 items-center">
            <Image
              src={
                sessionUser?.profileImageURL ? sessionUser.profileImageURL : ""
              }
              alt="user-image"
              width={45}
              height={45}
              className="rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                {sessionUser
                  ? sessionUser.firstName + " " + sessionUser.lastName
                  : ""}
              </span>
              <span className="text-zinc-500">@{sessionUser?.username}</span>
            </div>
          </div>
          <AiOutlineEllipsis className="text-xl" />
        </div>
      </div>

      <>
        {isCreateTweetModalOpen && (
          <PostTweetModal
            mode={MODE.CREATE_TWEET}
            onClose={() => setIsCreateTweetModalOpen(false)}
          />
        )}
      </>

      <>
        {isSignOutModalOpen && (
          <SignOutModal onClose={() => setIsSignOutModalOpen(false)} />
        )}
      </>
    </div>
  );
};

export default SideBar;
