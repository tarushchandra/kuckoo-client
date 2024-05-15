import { Comment, Tweet, TweetEngagement } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import {
  useCreateComment,
  useEditComment,
} from "@/hooks/mutations/tweet-engagement";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import mergeClasses from "@/utils/mergeClasses";
import Image from "next/image";
import { useState } from "react";
import { COMMENT_MODE } from "./post-comment-modal";

interface CreateCommentProps {
  tweet: Tweet;
  placeholder: string;
  tweetEngagement: TweetEngagement;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
  onClose?: () => void;
  comment?: Comment;
  mode?: COMMENT_MODE;
}

export default function CreateComment(props: CreateCommentProps) {
  const {
    tweetEngagement,
    tweet,
    onCommentMutation,
    onClose,
    mode,
    comment,
    placeholder,
  } = props;

  const [textContent, setTextContent] = useState(comment?.content || "");
  const { data: sessionUser } = useAuth(selectUser);

  const createCommentMutation = useCreateComment({
    onCommentMutation,
    setTextContent,
    onClose,
  });
  const editCommentMutation = useEditComment(onClose!);

  const handleCreateComment = () => {
    if (createCommentMutation.isPending) return;

    const payload = {
      id: tweet.id,
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
      tweetId: tweet.id,
      commentId: comment?.id!,
      content: textContent,
    });
  };

  return (
    <div className="sticky bottom-0 px-4 py-2 flex gap-2 items-start border-b border-zinc-800">
      <Image
        src={sessionUser?.profileImageURL!}
        alt="session-user-image"
        width={40}
        height={40}
        className="rounded-full"
      />
      <textarea
        name="tweet-input"
        id="tweet-input"
        rows={3}
        cols={50}
        className="bg-black text-sm focus:outline-none  my-[0.34rem] border-b border-b-zinc-800"
        placeholder={placeholder}
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />

      <>
        {mode === COMMENT_MODE.CREATE_COMMENT_ON_TWEET && (
          <button
            onClick={handleCreateComment}
            disabled={!textContent || createCommentMutation.isPending}
            className={mergeClasses(
              "bg-[#1D9BF0] font-xs font-semibold text-white rounded-full px-4 py-1 disabled:bg-sky-900 disabled:text-zinc-500 active:scale-[0.95]",
              createCommentMutation.isPending && "disabled:cursor-wait",
              !textContent && "disabled:cursor-not-allowed",
              createCommentMutation.isPending &&
                tweetEngagement === null &&
                "disabled:cursor-wait"
            )}
          >
            Post
          </button>
        )}

        {mode === COMMENT_MODE.EDIT_COMMENT_ON_TWEET && (
          <button
            onClick={handleEditComment}
            disabled={
              !textContent ||
              textContent === comment?.content ||
              editCommentMutation.isPending
            }
            className={mergeClasses(
              "bg-[#1D9BF0] font-xs font-semibold text-white rounded-full px-4 py-1 disabled:bg-sky-900 disabled:text-zinc-500 active:scale-[0.95]",
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
    </div>
  );
}
