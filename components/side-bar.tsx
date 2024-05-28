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

interface SideBarMenuI {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const SideBar: React.FC = () => {
  const { data: sessionUser } = useAuth(selectUser);
  const unseenNotificationsCount = useUnseenNotificationsCount();
  const path = usePathname();

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
              <Link
                href="/home"
                className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
              >
                {path.includes("home") ? (
                  <>
                    <Home strokeWidth={3} absoluteStrokeWidth={false} />
                    <h2 className="text-xl font-semibold">Home</h2>
                  </>
                ) : (
                  <>
                    <Home />
                    <h2 className="text-xl">Home</h2>
                  </>
                )}
              </Link>
              <Link
                href="/search"
                className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
              >
                {path.includes("search") ? (
                  <>
                    <Search strokeWidth={3} />
                    <h2 className="text-xl font-semibold">Search</h2>
                  </>
                ) : (
                  <>
                    <Search />
                    <h2 className="text-xl">Search</h2>
                  </>
                )}
              </Link>
              <Link
                href="/messages"
                className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
              >
                {path.includes("messages") ? (
                  <>
                    <div className="relative">
                      <Mail strokeWidth={3} />
                      {/* <Badge className="-mt-[0.5rem] -mr-[0.3rem]">5</Badge> */}
                    </div>
                    <h2 className="text-xl font-semibold">Messages</h2>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <Mail />
                      {/* <Badge className="-mt-[0.5rem] -mr-[0.3rem]">5</Badge> */}
                    </div>
                    <h2 className="text-xl">Messages</h2>
                  </>
                )}
              </Link>
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
                    <h2 className="text-xl font-semibold">Notifications</h2>
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
                    <h2 className="text-xl">Notifications</h2>
                  </>
                )}
              </Link>
              <Link
                href="/bookmarks"
                className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
              >
                {path.includes("bookmarks") ? (
                  <>
                    <Bookmark className="fill-white" />
                    <h2 className="text-xl font-semibold">Bookmarks</h2>
                  </>
                ) : (
                  <>
                    <Bookmark />
                    <h2 className="text-xl">Bookmarks</h2>
                  </>
                )}
              </Link>
              <Link
                href={`/profile/${sessionUser?.username}`}
                className="flex justify-start items-center gap-3 px-4 py-3 w-fit transition-all rounded-full cursor-pointer hover:bg-zinc-900"
              >
                {path.includes("profile") ? (
                  <>
                    <User className="fill-white" />
                    <h2 className="text-xl font-semibold">Profile</h2>
                  </>
                ) : (
                  <>
                    <User />
                    <h2 className="text-xl">Profile</h2>
                  </>
                )}
              </Link>
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
