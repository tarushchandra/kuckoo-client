"use client";

import Image from "next/image";
import Skeleton from "./ui/skeleton";
import { useState } from "react";
import LikedByModal from "./liked-by-modal";
import { useTweetsLikedBy } from "@/hooks/queries/tweet-engagement";

interface MutualTweetLikersProps {
  tweetId: string;
}

export default function MutualTweetLikers({ tweetId }: MutualTweetLikersProps) {
  const tweetEngagement = useTweetsLikedBy(tweetId);
  const [isLikedByModalOpen, setIsLikedByModalOpen] = useState(false);

  if (tweetEngagement === undefined) return <Skeleton className="w-72 h-5" />;
  if (tweetEngagement === null)
    return <h1 className="text-sm font-semibold text-zinc-500">No likes</h1>;

  const firstThree = tweetEngagement.likedBy?.slice(0, 3);
  const remaining = tweetEngagement.likedBy?.slice(3);

  return (
    <>
      <div
        onClick={() => setIsLikedByModalOpen(true)}
        className="flex gap-2 text-sm font-semibold text-zinc-500 cursor-pointer"
      >
        <h1 className="hover:underline">Liked by -</h1>
        <div className="flex gap-1">
          {firstThree?.map((user: any) => {
            return (
              <div
                key={user?.username}
                className="cursor-pointer"
                title={user?.username}
              >
                <Image
                  src={user?.profileImageURL!}
                  alt="profile-pic"
                  className="rounded-full"
                  width={18}
                  height={18}
                />
              </div>
            );
          })}
        </div>
        {remaining?.length! > 0 && (
          <h1>
            and {remaining?.length}{" "}
            {remaining?.length! > 1 ? "others" : "other"}
          </h1>
        )}
      </div>

      {isLikedByModalOpen && (
        <LikedByModal
          tweetId={tweetId}
          onClose={() => setIsLikedByModalOpen(false)}
        />
      )}
    </>
  );
}
