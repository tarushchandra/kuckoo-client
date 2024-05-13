"use client";
import { Tweet, TweetEngagement as TweetEngagementType } from "@/gql/graphql";
import {
  useDislikeTweet,
  useLikeTweet,
} from "@/hooks/mutations/tweet-engagement";
import { useTweetEngagement } from "@/hooks/queries/tweet-engagement";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Skeleton from "./ui/skeleton";
import PostCommentModal, { COMMENT_MODE } from "./post-comment-modal";

interface TweetEngagementProps {
  tweet: Tweet;
  tweetEngagement?: TweetEngagementType | null;
  isCommentSectionOpen?: boolean;
  setIsCommentSectionOpen?: (x: boolean) => void;
}

export default function TweetEngagement(props: TweetEngagementProps) {
  const { tweet, tweetEngagement } = props;
  const path = usePathname();

  const [isTweetLikedBySessionUser, setIsTweetLikedBySessionUser] = useState<
    boolean | null
  >(() => {
    if (tweetEngagement?.isTweetLikedBySessionUser) return true;
    else if (tweetEngagement?.isTweetLikedBySessionUser === false) return false;
    else return null;
  });
  const [likesCount, setLikesCount] = useState(
    tweetEngagement?.likesCount || 0
  );
  const [commentsCount, setCommentsCount] = useState(
    tweetEngagement?.commentsCount || 0
  );

  const optimisticUpdaters = {
    setIsTweetLikedBySessionUser,
    setLikesCount,
    setCommentsCount,
  };
  const likeTweetMutation = useLikeTweet(optimisticUpdaters);
  const dislikeTweetMutation = useDislikeTweet(optimisticUpdaters);

  const handleLikeTweet = () => {
    if (likeTweetMutation.isPending) return;
    likeTweetMutation.mutate({ tweetId: tweet.id });
  };

  const handleDislikeTweet = () => {
    if (dislikeTweetMutation.isPending) return;
    dislikeTweetMutation.mutate({ tweetId: tweet.id });
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
          tweet={tweet}
        />
      </div>
    );
  }

  return (
    <div className="text-zinc-500 flex justify-between px-10">
      <TweetEngagementLogic
        tweetEngagement={{
          ...tweetEngagement,
          isTweetLikedBySessionUser,
          likesCount,
          commentsCount,
        }}
        handlerFns={{ handleDislikeTweet, handleLikeTweet }}
        tweet={tweet}
        onCommentMutation={{
          onSuccess: () => setCommentsCount((x) => x + 1),
          onError: () => setCommentsCount((x) => x - 1),
        }}
      />
    </div>
  );
}

// -----------------------------------------------------------------------------------

interface TweetEngagementLogicProps {
  handlerFns: {
    handleLikeTweet: () => void;
    handleDislikeTweet: () => void;
  };
  tweetEngagement: TweetEngagementType | null;
  tweet: Tweet;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
}

function TweetEngagementLogic(props: TweetEngagementLogicProps) {
  const { handlerFns, tweetEngagement, tweet, onCommentMutation } = props;
  const { handleDislikeTweet, handleLikeTweet } = handlerFns;
  const [isCreateCommentModalOpen, setIsCreateCommentModalOpen] =
    useState(false);

  const modifiedOnCommentMutation = {
    ...onCommentMutation,
    onSuccess: () => {
      onCommentMutation?.onSuccess();
      setIsCreateCommentModalOpen(false);
    },
  };

  // console.log("tweetEngagement -", tweetEngagement);

  return (
    <>
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
                {tweetEngagement?.likesCount ? tweetEngagement.likesCount : 0}
              </h1>
            </div>
          )}
        </>
        <div
          onClick={() => setIsCreateCommentModalOpen(true)}
          className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400"
        >
          <MessageCircle size={17} />
          <h1 className="text-xs">
            {tweetEngagement?.commentsCount ? tweetEngagement.commentsCount : 0}
          </h1>
        </div>
        <div className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400">
          <Send size={17} />
          <h1 className="text-xs">0</h1>
        </div>
        <Bookmark
          size={17}
          className="cursor-pointer transition-all hover:text-zinc-400"
        />
      </>
      <>
        {isCreateCommentModalOpen && (
          <PostCommentModal
            mode={COMMENT_MODE.CREATE_COMMENT_ON_TWEET}
            onClose={() => setIsCreateCommentModalOpen(false)}
            tweet={tweet}
            tweetEngagement={tweetEngagement!}
            onCommentMutation={modifiedOnCommentMutation as any}
          />
        )}
      </>
    </>
  );
}
