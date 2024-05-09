"use client";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { FilePenLine, Heart, MessageCircle, Reply, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CommentCard() {
  const { data: sessionUser } = useAuth(selectUser);

  return (
    <div className="hover:bg-zinc-950">
      <div className="flex py-4 gap-2 items-start border-b border-zinc-800">
        <Image
          src={sessionUser?.profileImageURL!}
          alt="session-user-image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="text-sm flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <h2 className="font-semibold hover:underline">Tarush Chandra</h2>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <span>@{sessionUser?.username}</span>
                <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                <span>2 days ago</span>
              </div>
            </div>
            <div className="flex gap-1">
              <div
                className="bg-white text-black p-1 rounded-full transition-all cursor-pointer hover:bg-zinc-200"
                title="Edit this tweet"
              >
                <FilePenLine size={13} />
              </div>
              <div
                className="bg-red-700 p-1 rounded-full transition-all cursor-pointer hover:bg-red-800"
                title="Delete this tweet?"
              >
                <Trash2 size={13} className="transition-all text-white" />
              </div>
            </div>
          </div>
          <p>This is my first comment</p>
          <div className="text-zinc-500 flex gap-4  pt-1">
            <div className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400">
              <Heart size={15} />
              <h1 className="text-xs">0</h1>
            </div>
            <div className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400">
              <MessageCircle size={15} />
              <h1 className="text-xs">0</h1>
            </div>
            <Reply
              size={15}
              className="cursor-pointer transition-all hover:text-zinc-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div
                className="bg-white text-black p-1 rounded-full transition-all cursor-pointer hover:bg-zinc-200"
                title="Edit this tweet"
              >
                <FilePenLine size={13} />
              </div>
              <div
                className="bg-red-700 p-1 rounded-full transition-all cursor-pointer hover:bg-red-800"
                title="Delete this comment?"
              >
                <Trash2 size={13} className="transition-all text-white" />
              </div> */
}
