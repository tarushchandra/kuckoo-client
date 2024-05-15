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

dayjs.extend(relativeTime);

interface CommentCardProps {
  comment: Comment;
  tweet: Tweet;
}

export default function CommentCard({ comment, tweet }: CommentCardProps) {
  const { data: sessionUser } = useAuth(selectUser);
  const { content, createdAt, author, id } = comment;
  const formattedCommentCreatedAt = dayjs(Number(createdAt)).fromNow();

  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);

  const [isCommentLikedBySessionUser, setIsCommentLikedBySessionUser] =
    useState(comment.isCommentLikedBySessionUser);
  const [likesCount, setLikesCount] = useState(comment.likesCount);

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

  return (
    <div className="hover:bg-zinc-950 px-4">
      <div className="flex py-4 gap-2 items-start border-b border-zinc-800 w-full">
        <Link href={`/profile/${author?.username}`} className="">
          <Image
            src={author?.profileImageURL!}
            alt="session-user-image"
            width={45}
            height={45}
            className="rounded-full transition-all hover:opacity-90"
          />
        </Link>
        <div className="text-sm flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Link
                href={`/profile/${author?.username}`}
                className="font-semibold hover:underline"
              >
                {author?.firstName} {author?.lastName}
              </Link>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <span>@{author?.username}</span>
                <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                <span>{formattedCommentCreatedAt}</span>
                <>
                  {comment.createdAt !== comment.updatedAt && (
                    <>
                      <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                      <h2>edited</h2>
                    </>
                  )}
                </>
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
          <p>{content}</p>
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
            <div className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400">
              <MessageCircle size={15} />
              <h1 className="text-xs">0</h1>
            </div>
            <Reply
              size={15}
              className="cursor-pointer transition-all hover:text-zinc-400"
            />
          </div>
        </div>
      </div>

      <>
        {isDeleteCommentModalOpen && (
          <DeleteCommentModal
            onClose={() => setIsDeleteCommentModalOpen(false)}
            tweetId={tweet.id}
            comment={{ ...comment, createdAt: formattedCommentCreatedAt }}
          />
        )}

        {isEditCommentModalOpen && (
          <PostCommentModal
            mode={COMMENT_MODE.EDIT_COMMENT_ON_TWEET}
            onClose={() => setIsEditCommentModalOpen(false)}
            tweet={tweet}
            comment={comment}
          />
        )}
      </>
    </div>
  );
}
