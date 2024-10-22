"use client";
import { Comment, Tweet } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import dayjs from "dayjs";
import { FilePenLine, Heart, MessageCircle, Reply, Trash2 } from "lucide-react";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useState } from "react";
import DeleteCommentModal from "./delete-comment-modal";
import PostCommentModal, { COMMENT_MODE } from "./post-comment-modal";
import {
  useDislikeComment,
  useLikeComment,
} from "@/hooks/mutations/tweet-engagement";
import CommentReplies from "./comment-replies";

dayjs.extend(relativeTime);

/* 
  - jab reply successful ho jaye, tab automatically replies component showcase ho jaana 
    chahiye
  - jab reply successful ho jaye, toh query invalidate karne ke bajaye, uss particular
    react variable ko access karo, and usme newly added comment (reply) ko append kardo.
    (iss practice se mai lazy loading of replies ko implement kar sakta hu)
*/

interface CommentCardProps {
  comment: Comment;
  tweet: Tweet;
  setParentCommentsCount?: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentCard(props: CommentCardProps) {
  const { comment, tweet, setParentCommentsCount } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const { content, createdAt, author, id, parentComment, repliedTo } = comment;
  const formattedCommentCreatedAt = dayjs(Number(createdAt)).fromNow();

  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [isCreateReplyModalOpen, setIsCreateReplyModalOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [isCommentLikedBySessionUser, setIsCommentLikedBySessionUser] =
    useState(comment.isCommentLikedBySessionUser);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const [commentsCount, setCommentsCount] = useState(
    comment.commentsCount || 0
  );

  const updaterFns = {
    like: () => {
      setIsCommentLikedBySessionUser(true);
      setLikesCount((x) => x! + 1);
    },
    dislike: () => {
      setIsCommentLikedBySessionUser(false);
      setLikesCount((x) => x! - 1);
    },
  };
  const likeCommentMutation = useLikeComment(updaterFns);
  const dislikeCommentMutation = useDislikeComment(updaterFns);

  // console.log("comment -", comment);

  return (
    <>
      <div className="flex py-4 gap-2 items-start border-b border-zinc-800">
        <Link href={`/profile/${author?.username}`}>
          <Image
            src={author?.profileImageURL!}
            alt="session-user-image"
            width={45}
            height={45}
            className="rounded-full transition-all hover:opacity-90"
          />
        </Link>
        <div className="text-sm flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div className="flex xs:flex-col xl:flex-row xl:gap-2 xl:items-center">
              <Link
                href={`/profile/${author?.username}`}
                className="font-semibold hover:underline"
              >
                {author?.firstName} {author?.lastName}
              </Link>
              <div className="text-zinc-500 text-sm flex items-center gap-1 xl:gap-2 ">
                <span>@{author?.username}</span>
                <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                <span>{formattedCommentCreatedAt}</span>
                {/* <>
                  {comment.createdAt !== comment.updatedAt && (
                    <>
                      <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                      <h2>edited</h2>
                    </>
                  )}
                </> */}
              </div>
            </div>
            <>
              {sessionUser?.username === author?.username && (
                <div className="flex gap-1">
                  <div
                    className="bg-zinc-200 text-black p-1 rounded-full transition-all cursor-pointer hover:bg-zinc-200"
                    title="Edit this tweet"
                    onClick={() => setIsEditCommentModalOpen(true)}
                  >
                    <FilePenLine size={13} />
                  </div>
                  <div
                    className="bg-red-700  p-1 rounded-full transition-all cursor-pointer hover:bg-red-800"
                    title="Delete this tweet?"
                    onClick={() => setIsDeleteCommentModalOpen(true)}
                  >
                    <Trash2
                      size={13}
                      className="transition-all text-zinc-200"
                    />
                  </div>
                </div>
              )}
            </>
          </div>
          <div className="flex gap-2">
            {parentComment && (
              <Link
                href={`/profile/${repliedTo?.author?.username}`}
                className="text-[#1D9BF0] font-semibold"
              >
                @{repliedTo?.author?.username}
              </Link>
            )}
            <p>{content}</p>
          </div>
          <div className="text-zinc-500 flex gap-4  pt-1">
            <>
              {isCommentLikedBySessionUser ? (
                <div
                  onClick={() =>
                    dislikeCommentMutation.mutate({ commentId: id })
                  }
                  className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400"
                >
                  <Heart size={15} strokeWidth={0} className="fill-red-600" />
                  <h1 className="text-xs text-red-600">{likesCount}</h1>
                </div>
              ) : (
                <div
                  onClick={() => likeCommentMutation.mutate({ commentId: id })}
                  className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400"
                >
                  <Heart size={15} />
                  <h1 className="text-xs">{likesCount}</h1>
                </div>
              )}
            </>
            <>
              {!parentComment && (
                <div
                  onClick={() => setShowReplies((x) => !x)}
                  className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400"
                >
                  {showReplies ? (
                    <>
                      <MessageCircle
                        size={15}
                        strokeWidth={0}
                        className="fill-zinc-200"
                      />
                      <h1 className="text-xs text-zinc-200">{commentsCount}</h1>
                    </>
                  ) : (
                    <>
                      <MessageCircle size={15} />
                      <h1 className="text-xs">{commentsCount || 0}</h1>
                    </>
                  )}
                </div>
              )}
            </>
            <Reply
              size={15}
              className="cursor-pointer transition-all hover:text-zinc-400"
              onClick={() => setIsCreateReplyModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <>
        {showReplies && !parentComment && (
          <CommentReplies
            commentId={id}
            tweet={tweet}
            setParentCommentsCount={setCommentsCount}
          />
        )}
      </>

      <>
        {isDeleteCommentModalOpen && (
          <DeleteCommentModal
            onClose={() => setIsDeleteCommentModalOpen(false)}
            onCommentMutation={() =>
              setParentCommentsCount
                ? setParentCommentsCount((x) => x - 1)
                : setCommentsCount((x) => x - 1)
            }
            tweetId={tweet.id}
            comment={{ ...comment, createdAt: formattedCommentCreatedAt }}
          />
        )}

        {isEditCommentModalOpen &&
          (!parentComment ? (
            <PostCommentModal
              mode={COMMENT_MODE.EDIT_COMMENT_ON_TWEET}
              onClose={() => setIsEditCommentModalOpen(false)}
              tweet={tweet}
              comment={comment}
            />
          ) : (
            <PostCommentModal
              mode={COMMENT_MODE.EDIT_REPLY_ON_COMMENT}
              onClose={() => setIsEditCommentModalOpen(false)}
              tweet={tweet}
              comment={comment}
            />
          ))}

        {isCreateReplyModalOpen && (
          <PostCommentModal
            mode={COMMENT_MODE.CREATE_REPLY_ON_COMMENT}
            onClose={() => setIsCreateReplyModalOpen(false)}
            onCommentMutation={{
              onSuccess: () => {
                setShowReplies(true);
                setParentCommentsCount
                  ? setParentCommentsCount((x) => x + 1)
                  : setCommentsCount((x) => x + 1);
              },
              onError: () => {},
            }}
            tweet={tweet}
            comment={{ ...comment, createdAt: formattedCommentCreatedAt }}
          />
        )}
      </>
    </>
  );
}
