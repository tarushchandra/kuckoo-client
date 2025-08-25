"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import {
  Bell,
  Bookmark,
  Home,
  ImagePlus,
  Mail,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import PostPostModal, { MODE } from "./create-post-modal";
import SignOutModal from "./signout-modal";
import Badge from "./ui/badge";
import { useUnseenNotificationsCount } from "@/hooks/queries/notification";
import { usePathname } from "next/navigation";
import { IoMdMail } from "react-icons/io";
import mergeClasses from "@/utils/mergeClasses";
import { useAppSelector } from "@/hooks/redux";
import { useUnseenChatsCount } from "@/hooks/services/chat";

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

  const sidebarMenuItems = useMemo(() => {
    return [
      {
        id: 1,
        text: "Home",
        path: "home",
        icon: <Home />,
        selectedIcon: <Home strokeWidth={3} absoluteStrokeWidth={false} />,
      },
      {
        id: 2,
        text: "Search",
        path: "search",
        icon: <Search />,
        selectedIcon: <Search strokeWidth={3} absoluteStrokeWidth={false} />,
      },
      {
        id: 3,
        text: "Messages",
        path: "messages",
        icon: <Mail />,
        selectedIcon: <IoMdMail className="text-[1.5rem]" />,
      },
      {
        id: 4,
        text: "Notifications",
        path: "notifications",
        icon: <Bell />,
        selectedIcon: <Bell className="fill-white" />,
      },
      {
        id: 5,
        text: "Bookmarks",
        path: "bookmarks",
        icon: <Bookmark />,
        selectedIcon: <Bookmark className="fill-white" />,
      },
      {
        id: 6,
        text: "Profile",
        path: `profile/${sessionUser?.username}`,
        icon: <User />,
        selectedIcon: <User className="fill-white" />,
      },
    ];
  }, [sessionUser?.username]);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <div className={className}>
      <div className=" sm:sticky sm:top-0 sm:h-screen sm:pb-4 flex flex-col justify-between sm:max-xl:items-center">
        {/* <div className="pb-4  sticky sm:top-0 sm:h-screen flex flex-col justify-between sm:max-xl:items-center"> */}
        <div>
          <div className="hidden sm:block text-3xl w-fit p-4 rounded-full cursor-pointer transition-all hover:bg-zinc-900">
            <Link href="/home">
              <BsTwitter />
            </Link>
          </div>
          <div className="flex flex-col justify-between sm:max-xl:items-center gap-4">
            <div className="xs:max-sm:flex xs:max-sm:justify-around">
              {sidebarMenuItems.map((menuItem) => {
                return (
                  <div key={menuItem.id} className="h-16 flex items-center">
                    <Link href={`/${menuItem.path}`} className="w-full group">
                      <div className="flex justify-start items-center w-fit gap-3 px-4 py-4  transition-all rounded-full xl:group-hover:bg-zinc-900">
                        <div className="relative">
                          <>
                            {path.includes(menuItem.path)
                              ? menuItem.selectedIcon
                              : menuItem.icon}
                          </>
                          <>
                            {menuItem.id === 3 && unseenChatsCount! > 0 && (
                              <Badge className="-mt-[0.5rem] -mr-[0.3rem]">
                                {unseenChatsCount}
                              </Badge>
                            )}
                          </>
                        </div>
                        <h2
                          className={mergeClasses(
                            "text-xl xs:max-xl:hidden",
                            path.includes(menuItem.path) && "font-bold",
                            path.includes("messages") && "hidden"
                          )}
                        >
                          {menuItem.text}
                        </h2>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div
              className={mergeClasses(
                "hidden sm:flex justify-center items-center w-fit font-semibold rounded-full transition-all hover:bg-primary-600 active:scale-[0.95]",
                !path.includes("messages") && "xl:w-full"
              )}
            >
              <button
                onClick={() => setIsCreatePostModalOpen(true)}
                className={mergeClasses(
                  "bg-primary-500 p-4 rounded-full flex justify-center items-center w-full"
                )}
              >
                <span className={!path.includes("messages") ? "xl:hidden" : ""}>
                  <ImagePlus />
                </span>
                <span
                  className={
                    path.includes("messages") ? "hidden" : "xs:max-xl:hidden"
                  }
                >
                  Post
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          onClick={() => setIsSignOutModalOpen(true)}
          className="hidden sm:flex w-fit gap-3 items-center transition-all rounded-full cursor-pointer hover:bg-zinc-900 p-3 xl:w-full"
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
          <>
            {!path.includes("messages") && (
              <div className="hidden flex-col text-sm xl:flex">
                <span className="font-semibold">
                  {sessionUser?.firstName} {sessionUser?.lastName}
                </span>
                <span className="text-zinc-500">@{sessionUser?.username}</span>
              </div>
            )}
          </>
        </div>
      </div>

      <>
        {isCreatePostModalOpen && (
          <PostPostModal
            mode={MODE.CREATE_POST}
            onClose={() => setIsCreatePostModalOpen(false)}
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
