import { Tweet, TweetEngagement as TweetEngagementType } from "@/gql/graphql";
import {
  useDislikeTweet,
  useLikeTweet,
} from "@/hooks/mutations/tweet-engagement";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TweetEngagementProps {
  tweet: Tweet;
  tweetEngagement: TweetEngagementType | null;
  isCommentSectionOpen?: boolean;
  setIsCommentSectionOpen?: (x: boolean) => void;
}

export default function TweetEngagement(props: TweetEngagementProps) {
  const {
    tweet,
    tweetEngagement,
    isCommentSectionOpen,
    setIsCommentSectionOpen,
  } = props;
  const { id } = tweet;

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

  return (
    <div className="text-zinc-500 flex justify-between px-10 pt-1">
      <>
        {isTweetLikedBySessionUser ? (
          <div
            onClick={handleDislikeTweet}
            className="flex gap-1 justify-center items-center cursor-pointer"
          >
            <Heart size={17} strokeWidth={0} className="fill-red-600" />
            <h1 className="text-xs text-red-600">{likesCount}</h1>
          </div>
        ) : (
          <div
            onClick={handleLikeTweet}
            className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400"
          >
            <Heart size={17} />
            <h1 className="text-xs">{likesCount}</h1>
          </div>
        )}
      </>
      <>
        {setIsCommentSectionOpen ? (
          <>
            {isCommentSectionOpen ? (
              <div
                onClick={() => {
                  setIsCommentSectionOpen(false);
                }}
                className="flex gap-1 justify-center items-center cursor-pointer"
              >
                <MessageCircle size={17} className="fill-zinc-500" />
                <h1 className="text-xs">0</h1>
              </div>
            ) : (
              <div
                onClick={() => {
                  setIsCommentSectionOpen(true);
                }}
                className="flex gap-1 justify-center items-center cursor-pointer"
              >
                <MessageCircle size={17} />
                <h1 className="text-xs">0</h1>
              </div>
            )}
          </>
        ) : (
          <Link
            href={`/tweet/${id}`}
            className="flex gap-1 justify-center items-center cursor-pointer"
          >
            <MessageCircle size={17} />
            <h1 className="text-xs">0</h1>
          </Link>
        )}
      </>
      <div className="flex gap-1 justify-center items-center cursor-pointer">
        <Send size={17} />
        <h1 className="text-xs">0</h1>
      </div>
      <Bookmark size={17} className="cursor-pointer" />
    </div>
  );
}
