"use client";
import { Tweet, TweetEngagement as TweetEngagementType } from "@/gql/graphql";
import {
  useDislikeTweet,
  useLikeTweet,
} from "@/hooks/mutations/tweet-engagement";
import { useTweetEngagement } from "@/hooks/queries/tweet-engagement";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Skeleton from "./ui/skeleton";

interface TweetEngagementProps {
  tweet: Tweet;
  tweetEngagement?: TweetEngagementType | null;
  isCommentSectionOpen?: boolean;
  setIsCommentSectionOpen?: (x: boolean) => void;
}

export default function TweetEngagement(props: TweetEngagementProps) {
  const { tweet, tweetEngagement } = props;
  const { id } = tweet;
  const path = usePathname();

  const [isTweetLikedBySessionUser, setIsTweetLikedBySessionUser] = useState<
    boolean | null
  >(tweetEngagement?.isTweetLikedBySessionUser || null);
  const [likesCount, setLikesCount] = useState(
    tweetEngagement?.likesCount || 0
  );

  const optimisticUpdaters = { setIsTweetLikedBySessionUser, setLikesCount };
  const likeTweetMutation = useLikeTweet(optimisticUpdaters);
  const dislikeTweetMutation = useDislikeTweet(optimisticUpdaters);

  const handleLikeTweet = () => {
    if (likeTweetMutation.isPending) return;
    likeTweetMutation.mutate({ tweetId: id });
  };

  const handleDislikeTweet = () => {
    if (dislikeTweetMutation.isPending) return;
    dislikeTweetMutation.mutate({ tweetId: id });
  };

  if (path.includes("tweet")) {
    const tweetEngagement = useTweetEngagement(tweet.id);

    if (tweetEngagement === undefined) {
      return (
        <div className="flex justify-between px-10 pt-2 border-t border-zinc-800">
          <Skeleton className="w-6 h-4 rounded-full" />
          <Skeleton className="w-6 h-4 rounded-full" />
          <Skeleton className="w-6 h-4 rounded-full" />
          <Skeleton className="w-6 h-4 rounded-full" />
        </div>
      );
    }

    return (
      <div className="text-zinc-500 flex justify-between px-10 pt-2 border-t border-zinc-800">
        <TweetEngagementLogic
          handlerFns={{ handleLikeTweet, handleDislikeTweet }}
          tweetEngagement={tweetEngagement!}
          tweetId={id}
        />
      </div>
    );
  }

  return (
    <div className="text-zinc-500 flex justify-between px-10">
      <TweetEngagementLogic
        tweetEngagement={{ isTweetLikedBySessionUser, likesCount }}
        handlerFns={{ handleDislikeTweet, handleLikeTweet }}
        tweetId={id}
      />
    </div>
  );
}

interface TweetEngagementLogicProps {
  handlerFns: {
    handleLikeTweet: () => void;
    handleDislikeTweet: () => void;
  };
  tweetEngagement: TweetEngagementType;
  tweetId: string;
}

const TweetEngagementLogic = (props: TweetEngagementLogicProps) => {
  const { handlerFns, tweetEngagement, tweetId: id } = props;
  const { handleDislikeTweet, handleLikeTweet } = handlerFns;

  return (
    <>
      <>
        {tweetEngagement?.isTweetLikedBySessionUser ? (
          <div
            onClick={handleDislikeTweet}
            className="flex gap-1 justify-center items-center cursor-pointer"
          >
            <Heart size={17} strokeWidth={0} className="fill-red-600" />
            <h1 className="text-xs text-red-600">
              {tweetEngagement.likesCount}
            </h1>
          </div>
        ) : (
          <div
            onClick={handleLikeTweet}
            className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400"
          >
            <Heart size={17} />
            <h1 className="text-xs">
              {tweetEngagement ? tweetEngagement.likesCount : 0}
            </h1>
          </div>
        )}
      </>
      <>
        <Link
          href={`/tweet/${id}`}
          className="flex gap-1 justify-center items-center cursor-pointer"
        >
          <MessageCircle size={17} />
          <h1 className="text-xs">0</h1>
        </Link>
      </>
      <div className="flex gap-1 justify-center items-center cursor-pointer">
        <Send size={17} />
        <h1 className="text-xs">0</h1>
      </div>
      <Bookmark size={17} className="cursor-pointer" />
    </>
  );
};
