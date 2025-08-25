import { Comment, Post, PostEngagement } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import {
  useCreateComment,
  useCreateCommentReply,
  useEditComment,
} from "@/hooks/mutations/post-engagement";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import mergeClasses from "@/utils/mergeClasses";
import Image from "next/image";
import { useState } from "react";
import { COMMENT_MODE } from "./post-comment-modal";

interface CreateCommentProps {
  post: Post;
  placeholder: string;
  postEngagement: PostEngagement;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
  onClose?: () => void;
  comment?: Comment;
  mode?: COMMENT_MODE;
}

export default function CreateComment(props: CreateCommentProps) {
  const {
    postEngagement,
    post,
    onCommentMutation,
    onClose,
    mode,
    comment,
    placeholder,
  } = props;

  // console.log("post -", post);
  // console.log("comment -", comment);
  // console.log("onClose -", onClose);

  const { data: sessionUser } = useAuth(selectUser);
  const [textContent, setTextContent] = useState(
    mode === COMMENT_MODE.EDIT_COMMENT_ON_POST ||
      mode === COMMENT_MODE.EDIT_REPLY_ON_COMMENT
      ? comment?.content!
      : ""
  );

  const createCommentMutation = useCreateComment({
    onCommentMutation,
    setTextContent,
    onClose,
  });
  const editCommentMutation = useEditComment(onClose!);
  const createCommentReplyMutation = useCreateCommentReply({
    onCommentMutation,
    onClose,
  });

  const handleCreateComment = () => {
    if (createCommentMutation.isPending) return;

    const payload = {
      id: post.id,
      content: textContent,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      author: {
        firstName: sessionUser?.firstName,
        lastName: sessionUser?.lastName,
        username: sessionUser?.username,
        profileImageURL: sessionUser?.profileImageURL,
      },
    };
    createCommentMutation.mutate(payload as any);
  };

  const handleEditComment = () => {
    if (editCommentMutation.isPending) return;
    editCommentMutation.mutate({
      postId: post.id,
      commentId: comment?.id!,
      content: textContent,
      parentCommentId: comment?.parentComment?.id!,
    });
  };

  const handleCreateCommentReply = () => {
    if (createCommentReplyMutation.isPending) return;

    createCommentReplyMutation.mutate({
      postId: post.id,
      commentId: comment?.id!,
      content: textContent,
      parentCommentId: comment?.parentComment?.id!,
    });
  };

  const handleEditCommentReply = () => {};

  return (
    <div className=" py-2 flex gap-2 items-start border-b border-zinc-800">
      <Image
        src={sessionUser?.profileImageURL!}
        alt="session-user-image"
        width={40}
        height={40}
        className="rounded-full"
      />
      <textarea
        rows={3}
        className="w-full bg-black text-sm focus:outline-none  my-[0.34rem] border-b border-b-zinc-800"
        placeholder={placeholder}
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />

      <>
        {mode === COMMENT_MODE.CREATE_COMMENT_ON_POST && (
          <button
            onClick={handleCreateComment}
            disabled={!textContent || createCommentMutation.isPending}
            className={mergeClasses(
              "bg-primary-500 font-xs font-semibold text-white rounded-full px-4 py-1 disabled:bg-primary-900 disabled:text-zinc-500 active:scale-[0.95]",
              createCommentMutation.isPending && "disabled:cursor-wait",
              !textContent && "disabled:cursor-not-allowed",
              createCommentMutation.isPending &&
                postEngagement === null &&
                "disabled:cursor-wait"
            )}
          >
            Post
          </button>
        )}
      </>

      <>
        {(mode === COMMENT_MODE.EDIT_COMMENT_ON_POST ||
          mode === COMMENT_MODE.EDIT_REPLY_ON_COMMENT) && (
          <button
            onClick={handleEditComment}
            disabled={
              !textContent ||
              textContent === comment?.content ||
              editCommentMutation.isPending
            }
            className={mergeClasses(
              "bg-primary-500 font-xs font-semibold text-white rounded-full px-4 py-1 disabled:bg-primary-900 disabled:text-zinc-500 active:scale-[0.95]",
              editCommentMutation.isPending && "disabled:cursor-wait",
              !textContent ||
                (textContent === comment?.content &&
                  "disabled:cursor-not-allowed")
            )}
          >
            Save
          </button>
        )}
      </>

      <>
        {mode === COMMENT_MODE.CREATE_REPLY_ON_COMMENT && (
          <button
            onClick={handleCreateCommentReply}
            disabled={!textContent || createCommentReplyMutation.isPending}
            className={mergeClasses(
              "bg-primary-500 font-xs font-semibold text-white rounded-full px-4 py-1 disabled:bg-primary-900 disabled:text-zinc-500 active:scale-[0.95]",
              createCommentReplyMutation.isPending && "disabled:cursor-wait"
            )}
          >
            Reply
          </button>
        )}
      </>
    </div>
  );
}
