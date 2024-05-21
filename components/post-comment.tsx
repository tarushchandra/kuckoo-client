import {
  Comment,
  Tweet,
  TweetEngagement as TweetEngagementType,
} from "@/gql/graphql";
import { COMMENT_MODE } from "./post-comment-modal";
import TweetCard from "./tweet-card";
import Image from "next/image";
import CreateComment from "./create-comment";
import { useRepliedToComment } from "@/hooks/queries/tweet-engagement";
import CommentCardLoading from "./ui/comment-card-loading";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

interface PostCommentProps {
  mode: COMMENT_MODE;
  onClose: () => void;
  tweet?: Tweet;
  comment?: Comment;
  tweetEngagement?: TweetEngagementType;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
}

export default function PostComment(props: PostCommentProps) {
  const { mode, onClose, tweet, tweetEngagement, onCommentMutation, comment } =
    props;

  let repliedToComment;
  if (mode === COMMENT_MODE.EDIT_REPLY_ON_COMMENT)
    repliedToComment = useRepliedToComment(comment?.id!, tweet?.id!);

  // console.log("comment -", comment);
  // console.log("repliedToComment -", repliedToComment);

  return (
    <>
      {mode === COMMENT_MODE.CREATE_COMMENT_ON_TWEET && (
        <>
          <div className="pb-4 border-b border-zinc-800 overflow-auto">
            <div className="flex py-4 gap-2 items-start">
              <Image
                src={tweet?.author?.profileImageURL!}
                alt="user-image"
                width={40}
                height={40}
                className="rounded-full transition-all hover:opacity-90"
              />
              <div className="text-sm flex flex-col w-full">
                <div className="flex gap-2 items-center">
                  <h1 className="font-semibold hover:underline">
                    {tweet?.author?.firstName} {tweet?.author?.lastName}
                  </h1>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm">
                    <span>@{tweet?.author?.username}</span>
                    <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                    <span>{tweet?.createdAt}</span>
                  </div>
                </div>
                <p>{tweet?.content}</p>
              </div>
            </div>
            {tweet?.imageURL && (
              <Image
                src={tweet.imageURL}
                alt="tweet-image"
                width={640}
                height={360}
                className="rounded-xl border border-zinc-800 object-cover"
              />
            )}
          </div>
          <CreateComment
            tweet={tweet!}
            tweetEngagement={tweetEngagement!}
            onCommentMutation={onCommentMutation}
            onClose={onClose}
            mode={COMMENT_MODE.CREATE_COMMENT_ON_TWEET}
            placeholder="Add a comment"
          />
        </>
      )}

      {mode === COMMENT_MODE.EDIT_COMMENT_ON_TWEET && (
        <>
          <div className="pb-4 border-b border-zinc-800 overflow-auto">
            <div className="flex py-4 gap-2 items-start">
              <Image
                src={tweet?.author?.profileImageURL!}
                alt="user-image"
                width={40}
                height={40}
                className="rounded-full transition-all hover:opacity-90"
              />
              <div className="text-sm flex flex-col w-full">
                <div className="flex gap-2 items-center">
                  <h1 className="font-semibold hover:underline">
                    {tweet?.author?.firstName} {tweet?.author?.lastName}
                  </h1>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm">
                    <span>@{tweet?.author?.username}</span>
                    <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                    <span>{tweet?.createdAt}</span>
                  </div>
                </div>
                <p>{tweet?.content}</p>
              </div>
            </div>
            {tweet?.imageURL && (
              <Image
                src={tweet.imageURL}
                alt="tweet-image"
                width={640}
                height={360}
                className="rounded-xl w-full h-full border border-zinc-800 object-cover"
              />
            )}
          </div>
          <CreateComment
            tweetEngagement={tweetEngagement!}
            onCommentMutation={onCommentMutation}
            onClose={onClose}
            mode={COMMENT_MODE.EDIT_COMMENT_ON_TWEET}
            placeholder="Edit your comment"
            tweet={tweet!}
            comment={comment as any}
          />
        </>
      )}

      {mode === COMMENT_MODE.CREATE_REPLY_ON_COMMENT && (
        <>
          <div className="pb-4 border-b border-zinc-800 overflow-auto">
            <div className="flex py-4 gap-2 items-start">
              <Image
                src={comment?.author?.profileImageURL!}
                alt="session-user-image"
                width={40}
                height={40}
                className="rounded-full transition-all hover:opacity-90"
              />
              <div className="text-sm flex flex-col w-full">
                <div className="flex gap-2 items-center">
                  <h1 className="font-semibold hover:underline">
                    {comment?.author?.firstName} {comment?.author?.lastName}
                  </h1>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm">
                    <span>@{comment?.author?.username}</span>
                    <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                    <span>{comment?.createdAt}</span>
                  </div>
                </div>
                <p>{comment?.content}</p>
              </div>
            </div>
            <h2 className="text-sm text-zinc-500">
              Replying to{" "}
              <span className="font-semibold text-[#1D9BF0]">
                @{comment?.author?.username}
              </span>
            </h2>
          </div>

          <CreateComment
            tweetEngagement={tweetEngagement!}
            onCommentMutation={onCommentMutation}
            onClose={onClose}
            mode={COMMENT_MODE.CREATE_REPLY_ON_COMMENT}
            placeholder="Add your Reply"
            tweet={tweet!}
            comment={comment as any}
          />
        </>
      )}

      {mode === COMMENT_MODE.EDIT_REPLY_ON_COMMENT && (
        <>
          <div className="pb-4 border-b border-zinc-800 overflow-auto">
            <>
              {repliedToComment ? (
                <div className="flex py-4 gap-2 items-start">
                  <Image
                    src={repliedToComment.author?.profileImageURL!}
                    alt="session-user-image"
                    width={40}
                    height={40}
                    className="rounded-full transition-all hover:opacity-90"
                  />
                  <div className="text-sm flex flex-col w-full">
                    <div className="flex gap-2 items-center">
                      <h1 className="font-semibold hover:underline">
                        {repliedToComment?.author?.firstName}{" "}
                        {repliedToComment?.author?.lastName}
                      </h1>
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <span>@{repliedToComment?.author?.username}</span>
                        <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                        <span>
                          {dayjs(Number(repliedToComment.createdAt)).fromNow()}
                        </span>
                      </div>
                    </div>
                    <p>{repliedToComment?.content}</p>
                  </div>
                </div>
              ) : (
                <CommentCardLoading />
              )}
            </>
            <h2 className="text-sm text-zinc-500">
              Replied to{" "}
              <span className="font-semibold text-[#1D9BF0]">
                @{comment?.author?.username}
              </span>
            </h2>
          </div>

          <CreateComment
            tweetEngagement={tweetEngagement!}
            onCommentMutation={onCommentMutation}
            onClose={onClose}
            mode={mode}
            placeholder="Edit your Reply"
            tweet={tweet!}
            comment={comment as any}
          />
        </>
      )}
    </>
  );
}
