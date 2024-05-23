"use client";

import Image from "next/image";
import Skeleton from "./ui/skeleton";
import { useState } from "react";
import LikedByModal from "./tweet-likes-modal";
import { useTweetsLikedBy } from "@/hooks/queries/tweet-engagement";
import TweetLikesModal from "./tweet-likes-modal";

interface MutualTweetLikersProps {
  tweetId: string;
}

export default function TweetLikes({ tweetId }: MutualTweetLikersProps) {
  const tweetEngagement = useTweetsLikedBy(tweetId);
  const [isLikedByModalOpen, setIsLikedByModalOpen] = useState(false);

  // if (tweetEngagement === undefined) return <div />;

  if (tweetEngagement === undefined) return <Skeleton className="w-32 h-4" />;

  if (!tweetEngagement || tweetEngagement?.likes?.length === 0)
    return <h1 className="text-sm font-semibold text-zinc-500">No likes</h1>;

  const firstThreeUsers = tweetEngagement.likes?.slice(0, 3);
  const remainingUsers = tweetEngagement.likes?.slice(3);

  return (
    <>
      <div
        onClick={() => setIsLikedByModalOpen(true)}
        className="flex gap-2 text-sm font-semibold text-zinc-500 cursor-pointer"
      >
        <h1 className="hover:underline">Likes -</h1>
        <div className="flex gap-1">
          {firstThreeUsers?.map((user: any) => {
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
        {remainingUsers?.length! > 0 && (
          <h1>
            and {remainingUsers?.length}{" "}
            {remainingUsers?.length! > 1 ? "others" : "other"}
          </h1>
        )}
      </div>

      {isLikedByModalOpen && (
        <TweetLikesModal
          tweetId={tweetId}
          onClose={() => setIsLikedByModalOpen(false)}
        />
      )}
    </>
  );
}
