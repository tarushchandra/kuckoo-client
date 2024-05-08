"use client";

import Image from "next/image";
import Link from "next/link";
import Skeleton from "./ui/skeleton";
import { useMutualTweetLikers } from "@/hooks/queries/tweet";

interface MutualTweetLikersProps {
  tweetId: string;
}

export default function MutualTweetLikers({ tweetId }: MutualTweetLikersProps) {
  const likedBy = useMutualTweetLikers(tweetId);

  if (!likedBy) return <Skeleton className="w-72 h-5" />;
  if (likedBy?.length === 0)
    return (
      <h1 className="text-sm font-semibold text-zinc-500">
        None of your followings liked this tweet
      </h1>
    );

  return (
    <div className="flex gap-2 text-sm">
      <h1 className="font-semibold text-zinc-500 hover:underline cursor-pointer">
        Liked by -
      </h1>
      <div className="flex gap-1">
        {likedBy?.map((mutualFollower) => {
          return (
            <div
              key={mutualFollower?.username}
              className="cursor-pointer"
              title={mutualFollower?.username}
            >
              <Image
                src={
                  mutualFollower?.profileImageURL
                    ? mutualFollower.profileImageURL
                    : ""
                }
                alt="profile-pic"
                className="rounded-full"
                width={18}
                height={18}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
