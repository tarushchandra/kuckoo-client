"use client";
import CommentCard from "./comment-card";
import { useTweetComments } from "@/hooks/queries/tweet-engagement";
import CreateComment from "./create-comment";
import { Tweet } from "@/gql/graphql";
import { COMMENT_MODE } from "./post-comment-modal";

export default function TweetComments({ tweet }: { tweet: Tweet }) {
  const tweetEngagement = useTweetComments(tweet.id);

  // console.log("tweetEngagement -", tweetEngagement);
  // console.log("comments -", tweetEngagement?.comments);

  return (
    <div className=" pt-4 border-t border-zinc-800">
      <CreateComment
        tweet={tweet}
        tweetEngagement={tweetEngagement as any}
        placeholder="Add a comment"
        mode={COMMENT_MODE.CREATE_COMMENT_ON_TWEET}
      />

      <>
        {tweetEngagement === undefined ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          tweetEngagement?.comments &&
          tweetEngagement.comments.map((comment: any) => (
            <CommentCard key={comment?.id} comment={comment} tweet={tweet} />
          ))
        )}
      </>
    </div>
  );
}
