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
import PostTweetModal, { MODE } from "./post-tweet-modal";
import SignOutModal from "./signout-modal";
import Badge from "./ui/badge";
import { useUnseenNotificationsCount } from "@/hooks/queries/notification";
import { usePathname } from "next/navigation";
import { useUnseenChatsCount } from "@/hooks/queries/chat";
import { IoMdMail } from "react-icons/io";
import mergeClasses from "@/utils/mergeClasses";

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

  const [isCreateTweetModalOpen, setIsCreateTweetModalOpen] = useState(false);
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
                  <div className="h-16 flex items-center">
                    <Link href={`/${menuItem.path}`} className="w-full group">
                      <div className="flex justify-start items-center w-fit gap-3 px-4 py-4  transition-all rounded-full xl:group-hover:bg-zinc-900">
                        <>
                          {path.includes(menuItem.path)
                            ? menuItem.selectedIcon
                            : menuItem.icon}
                        </>
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
                "hidden sm:flex justify-center items-center w-fit font-semibold rounded-full transition-all hover:bg-[#1993e6] active:scale-[0.95]",
                !path.includes("messages") && "xl:w-full"
              )}
            >
              <button
                onClick={() => setIsCreateTweetModalOpen(true)}
                className={mergeClasses(
                  "bg-[#1D9BF0] p-4 rounded-full flex justify-center items-center w-full"
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
                  Tweet
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

// return (
//   <div className={className}>
//     <div className="pb-4 sticky top-0 h-screen flex flex-col justify-between sm:max-xl:items-center">
//       <div>
//         <div className="text-3xl w-fit p-4 rounded-full cursor-pointer transition-all hover:bg-zinc-900">
//           <Link href="/home">
//             <BsTwitter />
//           </Link>
//         </div>
//         <div className="flex flex-col justify-between gap-6">
//           <div className="flex flex-col justify-between">
//             <div className="h-14 flex items-center">
//               <Link
//                 href="/home"
//                 className="flex justify-start items-center gap-3 px-4 py-3  transition-all rounded-full cursor-pointer hover:bg-zinc-900"
//               >
//                 {path.includes("home") ? (
//                   <>
//                     <Home strokeWidth={3} absoluteStrokeWidth={false} />
//                     {/* <MdHomeFilled className="text-[1.5rem]" /> */}
//                     <h2 className="text-xl font-bold sm:max-xl:hidden">
//                       Home
//                     </h2>
//                   </>
//                 ) : (
//                   <>
//                     <Home />
//                     {/* <IoHomeOutline strokeWidth={10} className="text-2xl" /> */}
//                     {!path.includes("messages") && (
//                       <h2 className="text-xl sm:max-xl:hidden">Home</h2>
//                     )}
//                   </>
//                 )}
//               </Link>
//             </div>
//             <div className="h-14 flex items-center">
//               <Link
//                 href="/search"
//                 className="flex justify-start items-center gap-3 px-4 py-3 transition-all rounded-full cursor-pointer hover:bg-zinc-900"
//               >
//                 {path.includes("search") ? (
//                   <>
//                     <Search strokeWidth={3} />
//                     <h2 className="text-xl font-bold sm:max-xl:hidden">
//                       Search
//                     </h2>
//                   </>
//                 ) : (
//                   <>
//                     <Search />
//                     {!path.includes("messages") && (
//                       <h2 className="text-xl sm:max-xl:hidden">Search</h2>
//                     )}
//                   </>
//                 )}
//               </Link>
//             </div>
//             <div className="h-14 flex items-center">
//               <Link
//                 href="/messages"
//                 className="flex justify-start items-center gap-3 px-4 py-3 transition-all rounded-full cursor-pointer hover:bg-zinc-900"
//               >
//                 {path.includes("messages") ? (
//                   <>
//                     <div className="relative">
//                       {/* <Mail strokeWidth={3} /> */}
//                       <IoMdMail className="text-[1.5rem]" />
//                       {/* <>
//                         {(unseenChatsCount && unseenChatsCount > 0) ||
//                         Object.keys(realTimeUnseenChats).length > 0 ? (
//                           <Badge className="-mt-[0.5rem] -mr-[0.3rem]">
//                             {unseenChatsCount ||
//                               Object.keys(realTimeUnseenChats).length}
//                           </Badge>
//                         ) : null}
//                       </> */}
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="relative">
//                       <Mail />
//                       <>
//                         {unseenChatsCount && unseenChatsCount > 0 ? (
//                           <Badge className="-mt-[0.5rem] -mr-[0.3rem]">
//                             {unseenChatsCount}
//                           </Badge>
//                         ) : null}
//                       </>
//                     </div>
//                     <h2 className="text-xl sm:max-xl:hidden">Messages</h2>
//                   </>
//                 )}
//               </Link>
//             </div>
//             <div className="h-14 flex items-center">
//               <Link
//                 href="/notifications"
//                 className="flex justify-start items-center gap-3 px-4 py-3 transition-all rounded-full cursor-pointer hover:bg-zinc-900"
//               >
//                 {path.includes("notifications") ? (
//                   <>
//                     <div className="relative">
//                       <Bell className="fill-white" />
//                       <>
//                         {unseenNotificationsCount &&
//                         unseenNotificationsCount > 0 ? (
//                           <Badge className="-mt-[0.5rem] -mr-[0.2rem]">
//                             {unseenNotificationsCount}
//                           </Badge>
//                         ) : null}
//                       </>
//                     </div>
//                     <h2 className="text-xl font-bold sm:max-xl:hidden">
//                       Notifications
//                     </h2>
//                   </>
//                 ) : (
//                   <>
//                     <div className="relative">
//                       <Bell />
//                       <>
//                         {unseenNotificationsCount &&
//                         unseenNotificationsCount > 0 ? (
//                           <Badge className="-mt-[0.5rem] -mr-[0.2rem]">
//                             {unseenNotificationsCount}
//                           </Badge>
//                         ) : null}
//                       </>
//                     </div>
//                     {!path.includes("messages") && (
//                       <h2 className="text-xl sm:max-xl:hidden">
//                         Notifications
//                       </h2>
//                     )}
//                   </>
//                 )}
//               </Link>
//             </div>
//             <div className="h-14 flex items-center">
//               <Link
//                 href="/bookmarks"
//                 className="flex justify-start items-center gap-3 px-4 py-3  transition-all rounded-full cursor-pointer hover:bg-zinc-900"
//               >
//                 {path.includes("bookmarks") ? (
//                   <>
//                     <Bookmark className="fill-white" />
//                     <h2 className="text-xl font-bold sm:max-xl:hidden">
//                       Bookmarks
//                     </h2>
//                   </>
//                 ) : (
//                   <>
//                     <Bookmark />
//                     {!path.includes("messages") && (
//                       <h2 className="text-xl sm:max-xl:hidden">Bookmarks</h2>
//                     )}
//                   </>
//                 )}
//               </Link>
//             </div>
//             <div className="h-14 flex items-center">
//               <Link
//                 href={`/profile/${sessionUser?.username}`}
//                 className="flex justify-start items-center gap-3 px-4 py-3  transition-all rounded-full cursor-pointer hover:bg-zinc-900"
//               >
//                 {path.includes("profile") ? (
//                   <>
//                     <User className="fill-white " />
//                     <h2 className="text-xl font-bold sm:max-xl:hidden">
//                       Profile
//                     </h2>
//                   </>
//                 ) : (
//                   <>
//                     <User />
//                     {!path.includes("messages") && (
//                       <h2 className="text-xl sm:max-xl:hidden">Profile</h2>
//                     )}
//                   </>
//                 )}
//               </Link>
//             </div>
//           </div>
//           {/* <>
//             {!path.includes("messages") && (
//               <button
//                 onClick={() => setIsCreateTweetModalOpen(true)}
//                 className="bg-[#1D9BF0] py-4 text-lg font-semibold rounded-full transition-all hover:bg-[#1993e6] active:scale-[0.95]"
//               >
//                 <span className="w-5 h-5 flex justify-center items-center xl:hidden">
//                   <ImagePlus />
//                 </span>
//                 <span className="sm:max-xl:hidden">Tweet</span>
//               </button>
//             )}
//           </> */}
//         </div>
//       </div>

//       <div>
//         {path.includes("messages") ? (
//           <>
//             <div
//               onClick={() => setIsSignOutModalOpen(true)}
//               className="rounded-full w-fit cursor-pointer hover:bg-zinc-900"
//             >
//               <Image
//                 src={sessionUser?.profileImageURL!}
//                 alt="user-image"
//                 width={40}
//                 height={40}
//                 className="rounded-full mx-3 my-3"
//               />
//             </div>
//           </>
//         ) : (
//           <div
//             onClick={() => setIsSignOutModalOpen(true)}
//             className="flex w-full gap-3 items-center transition-all rounded-full cursor-pointer hover:bg-zinc-900 p-3"
//           >
//             <div className="">
//               <Image
//                 src={sessionUser?.profileImageURL!}
//                 alt="user-image"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//             </div>
//             <div className="hidden flex-col text-sm xl:flex">
//               <span className="font-semibold">
//                 {sessionUser?.firstName} {sessionUser?.lastName}
//               </span>
//               <span className="text-zinc-500">@{sessionUser?.username}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>

//     <>
//       {isCreateTweetModalOpen && (
//         <PostTweetModal
//           mode={MODE.CREATE_TWEET}
//           onClose={() => setIsCreateTweetModalOpen(false)}
//         />
//       )}
//     </>

//     <>
//       {isSignOutModalOpen && (
//         <SignOutModal onClose={() => setIsSignOutModalOpen(false)} />
//       )}
//     </>
//   </div>
// );
