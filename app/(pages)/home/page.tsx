"use client";
import Header from "@/components/header";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useCreateTweet } from "@/hooks/mutations/tweet";

export default function HomePage() {
  const { data: sessionUser } = useAuth(selectUser);
  const [textContent, setTextContent] = useState("");
  const createTweetMutation = useCreateTweet(sessionUser?.username!);

  const handleCreateTweet = async () => {
    await createTweetMutation.mutateAsync({ content: textContent });
    setTextContent("");
  };

  return (
    <>
      <Header className="p-4 text-xl font-semibold">Home</Header>
      <div className="px-4 py-2 flex gap-3 border-b border-b-zinc-800">
        <div>
          <Image
            src={sessionUser?.profileImageURL!}
            alt="session-user-image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <textarea
            name="tweet-input"
            id="tweet-input"
            rows={4}
            cols={37}
            className="bg-black w-full text-xl focus:outline-none my-[0.34rem] border-b border-b-zinc-800"
            placeholder={`What's on your mind, ${sessionUser?.firstName}?`}
            onChange={(e) => setTextContent(e.target.value)}
            value={textContent}
          />
          <div className="flex justify-between items-center">
            <ImageIcon className="text-[#1D9BF0] cursor-pointer" size={20} />
            <button
              onClick={handleCreateTweet}
              disabled={createTweetMutation.isPending}
              className="bg-[#1D9BF0] text-sm font-bold text-white cursor-pointer px-4 py-2 transition-all rounded-full active:scale-[0.95] disabled:cursor-wait"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
