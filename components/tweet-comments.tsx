"use client";
import Image from "next/image";
import CommentCard from "./comment-card";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";

export default function TweetComments() {
  const { data: sessionUser } = useAuth(selectUser);

  return (
    <div className="px-4 pt-4 border-t border-zinc-800">
      <div className="pb-2 flex gap-2 items-start border-b border-zinc-800">
        <Image
          src={sessionUser?.profileImageURL!}
          alt="session-user-image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <textarea
          name="tweet-input"
          id="tweet-input"
          rows={3}
          cols={50}
          className="bg-black text-sm focus:outline-none  my-[0.34rem] border-b border-b-zinc-800"
          placeholder={`Add a comment`}
        />
        <button className="bg-[#1D9BF0] font-xs font-semibold text-white rounded-full px-4 py-1">
          Post
        </button>
      </div>

      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </div>
  );
}
