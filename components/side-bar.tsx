"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import {
  Bell,
  Bookmark,
  Home,
  Mail,
  Search,
  User,
  MailOpen,
} from "lucide-react";
import Link from "next/link";
import PostTweetModal, { MODE } from "./post-tweet-modal";
import SignOutModal from "./signout-modal";
import Badge from "./ui/badge";
import { useUnseenNotificationsCount } from "@/hooks/queries/notification";
import { usePathname } from "next/navigation";
import mergeClasses from "@/utils/mergeClasses";
import { useUnseenChatsCount } from "@/hooks/queries/chat";
import { IoMdMail } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { MdHomeFilled } from "react-icons/md";

interface SideBarMenuI {
  icon: React.ReactNode;
  title: string;
  link: string;
}

export default function SideBar({ className }: { className: string }) {
  const { data: sessionUser } = useAuth(selectUser);
  const path = usePathname();
  const unseenNotificationsCount = useUnseenNotificationsCount();
  const unseenChatsCount = useUnseenChatsCount();

  const [isCreateTweetModalOpen, setIsCreateTweetModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <div className={className}>
      <div className="h-screen flex flex-col justify-between pb-4 sticky top-0">
        <div className="px-2">
          <div className="text-3xl w-fit p-4 rounded-full cursor-pointer transition-all hover:bg-zinc-900">
            <Link href="/home">
              <BsTwitter />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-between gap-2">
              <div className="h-14 flex items-center">
                <Link
                  href="/home"
                  className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
                >
                  {path.includes("home") ? (
                    <>
                      <Home strokeWidth={3} absoluteStrokeWidth={false} />
                      {/* <MdHomeFilled className="text-[1.5rem]" /> */}
                      <h2 className="text-xl font-bold">Home</h2>
                    </>
                  ) : (
                    <>
                      <Home />
                      {/* <IoHomeOutline strokeWidth={10} className="text-2xl" /> */}
                      {!path.includes("messages") && (
                        <h2 className="text-xl">Home</h2>
                      )}
                    </>
                  )}
                </Link>
              </div>
              <div className="h-14 flex items-center">
                <Link
                  href="/search"
                  className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
                >
                  {path.includes("search") ? (
                    <>
                      <Search strokeWidth={3} />
                      <h2 className="text-xl font-bold">Search</h2>
                    </>
                  ) : (
                    <>
                      <Search />
                      {!path.includes("messages") && (
                        <h2 className="text-xl">Search</h2>
                      )}
                    </>
                  )}
                </Link>
              </div>
              <div className="h-14 flex items-center">
                <Link
                  href="/messages"
                  className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
                >
                  {path.includes("messages") ? (
                    <>
                      <div className="relative">
                        {/* <Mail strokeWidth={3} /> */}
                        <IoMdMail className="text-[1.5rem]" />
                        <>
                          {unseenChatsCount && unseenChatsCount > 0 ? (
                            <Badge className="-mt-[0.5rem] -mr-[0.3rem]">
                              {unseenChatsCount}
                            </Badge>
                          ) : null}
                        </>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <Mail />
                        <>
                          {unseenChatsCount && unseenChatsCount > 0 ? (
                            <Badge className="-mt-[0.5rem] -mr-[0.3rem]">
                              {unseenChatsCount}
                            </Badge>
                          ) : null}
                        </>
                      </div>
                      <h2 className="text-xl">Messages</h2>
                    </>
                  )}
                </Link>
              </div>
              <div className="h-14 flex items-center">
                <Link
                  href="/notifications"
                  className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
                >
                  {path.includes("notifications") ? (
                    <>
                      <div className="relative">
                        <Bell className="fill-white" />
                        <>
                          {unseenNotificationsCount &&
                          unseenNotificationsCount > 0 ? (
                            <Badge className="-mt-[0.5rem] -mr-[0.2rem]">
                              {unseenNotificationsCount}
                            </Badge>
                          ) : null}
                        </>
                      </div>
                      <h2 className="text-xl font-bold">Notifications</h2>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <Bell />
                        <>
                          {unseenNotificationsCount &&
                          unseenNotificationsCount > 0 ? (
                            <Badge className="-mt-[0.5rem] -mr-[0.2rem]">
                              {unseenNotificationsCount}
                            </Badge>
                          ) : null}
                        </>
                      </div>
                      {!path.includes("messages") && (
                        <h2 className="text-xl">Notifications</h2>
                      )}
                    </>
                  )}
                </Link>
              </div>
              <div className="h-14 flex items-center">
                <Link
                  href="/bookmarks"
                  className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
                >
                  {path.includes("bookmarks") ? (
                    <>
                      <Bookmark className="fill-white" />
                      <h2 className="text-xl font-bold">Bookmarks</h2>
                    </>
                  ) : (
                    <>
                      <Bookmark />
                      {!path.includes("messages") && (
                        <h2 className="text-xl">Bookmarks</h2>
                      )}
                    </>
                  )}
                </Link>
              </div>
              <div className="h-14 flex items-center">
                <Link
                  href={`/profile/${sessionUser?.username}`}
                  className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
                >
                  {path.includes("profile") ? (
                    <>
                      <User className="fill-white " />
                      <h2 className="text-xl font-bold">Profile</h2>
                    </>
                  ) : (
                    <>
                      <User />
                      {!path.includes("messages") && (
                        <h2 className="text-xl">Profile</h2>
                      )}
                    </>
                  )}
                </Link>
              </div>
            </div>
            <>
              {!path.includes("messages") && (
                <button
                  onClick={() => setIsCreateTweetModalOpen(true)}
                  className="bg-[#1D9BF0] w-full py-4 text-lg font-semibold rounded-full transition-all hover:bg-[#1993e6] active:scale-[0.95]"
                >
                  Tweet
                </button>
              )}
            </>
          </div>
        </div>

        {path.includes("messages") ? (
          <>
            <div
              onClick={() => setIsSignOutModalOpen(true)}
              className="rounded-full w-fit cursor-pointer hover:bg-zinc-900"
            >
              <Image
                src={sessionUser?.profileImageURL!}
                alt="user-image"
                width={40}
                height={40}
                className="rounded-full mx-3 my-3"
              />
            </div>
          </>
        ) : (
          <div
            onClick={() => setIsSignOutModalOpen(true)}
            className="flex gap-3 items-center px-3 py-3 transition-all rounded-full cursor-pointer hover:bg-zinc-900"
          >
            <div>
              <Image
                src={sessionUser?.profileImageURL!}
                alt="user-image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                {sessionUser?.firstName} {sessionUser?.lastName}
              </span>
              <span className="text-zinc-500">@{sessionUser?.username}</span>
            </div>
          </div>
        )}
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
}
