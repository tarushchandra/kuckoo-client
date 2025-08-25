"use client";
import { Post, PostEngagement as PostEngagementType } from "@/gql/graphql";
import {
  useCreateBookmark,
  useDislikePost,
  useLikePost,
  useRemoveBookmark,
} from "@/hooks/mutations/post-engagement";
import { usePostEngagement } from "@/hooks/queries/post-engagement";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import Skeleton from "./ui/skeleton";
import PostCommentModal, { COMMENT_MODE } from "./post-comment-modal";

interface PostEngagementForPostCardProps {
  post: Post;
  postEngagement?: PostEngagementType | null;
  isCommentSectionOpen?: boolean;
  setIsCommentSectionOpen?: (x: boolean) => void;
}

export default function PostEngagementForPostCard(
  props: PostEngagementForPostCardProps
) {
  // console.log("post engagement props -", props);

  const { post } = props;
  const postEngagement = post.postEngagement;

  const [isPostLikedBySessionUser, setIsPostLikedBySessionUser] = useState<
    boolean | null
  >(() => {
    if (postEngagement?.isPostLikedBySessionUser) return true;
    else if (postEngagement?.isPostLikedBySessionUser === false) return false;
    else return null;
  });
  const [likesCount, setLikesCount] = useState(postEngagement?.likesCount || 0);
  const [commentsCount, setCommentsCount] = useState(
    postEngagement?.commentsCount || 0
  );
  const [isPostBookmarkedBySessionUser, setIsPostBookmarkedBySessionUser] =
    useState<boolean | null>(() => {
      if (postEngagement?.isPostBookmarkedBySessionUser) return true;
      else if (postEngagement?.isPostBookmarkedBySessionUser === false)
        return false;
      else return null;
    });

  const likesOptimisticUpdaters = {
    setIsPostLikedBySessionUser,
    setLikesCount,
    setCommentsCount,
  };
  const likePostMutation = useLikePost(likesOptimisticUpdaters);
  const dislikePostMutation = useDislikePost(likesOptimisticUpdaters);

  const onBookmarkMutation = {
    createBookmark: () => setIsPostBookmarkedBySessionUser(true),
    removeBookmark: () => setIsPostBookmarkedBySessionUser(false),
  };
  const createBookmarkMutation = useCreateBookmark(onBookmarkMutation);
  const removeBookmarkMutation = useRemoveBookmark(onBookmarkMutation);

  const handleLikePost = () => {
    if (likePostMutation.isPending) return;
    likePostMutation.mutate({ postId: post.id });
  };

  const handleDislikePost = () => {
    if (dislikePostMutation.isPending) return;
    dislikePostMutation.mutate({ postId: post.id });
  };

  const handleCreateBookmark = () => {
    if (createBookmarkMutation.isPending) return;
    createBookmarkMutation.mutate({ postId: post.id });
  };

  const handleRemoveBookmark = () => {
    if (removeBookmarkMutation.isPending) return;
    removeBookmarkMutation.mutate({ postId: post.id });
  };

  return (
    <div className="text-zinc-500 flex justify-between px-10">
      <PostEngagement
        postEngagement={{
          ...postEngagement,
          isPostLikedBySessionUser,
          likesCount,
          commentsCount,
          isPostBookmarkedBySessionUser,
        }}
        handlerFns={{
          handleDislikePost,
          handleLikePost,
          handleCreateBookmark,
          handleRemoveBookmark,
        }}
        post={post}
        onCommentMutation={{
          onSuccess: () => setCommentsCount((x) => x + 1),
          onError: () => setCommentsCount((x) => x - 1),
        }}
      />
    </div>
  );
}

interface PostEngagementForModalProps {
  post: Post;
}

export function PostEngagementForModal(props: PostEngagementForModalProps) {
  // console.log("post engagement props -", props);
  const { post } = props;
  const postEngagement = usePostEngagement(post.id);

  const likePostMutation = useLikePost();
  const dislikePostMutation = useDislikePost();
  const createBookmarkMutation = useCreateBookmark();
  const removeBookmarkMutation = useRemoveBookmark();

  const handleLikePost = () => {
    if (likePostMutation.isPending) return;
    likePostMutation.mutate({ postId: post.id });
  };

  const handleDislikePost = () => {
    if (dislikePostMutation.isPending) return;
    dislikePostMutation.mutate({ postId: post.id });
  };

  const handleCreateBookmark = () => {
    if (createBookmarkMutation.isPending) return;
    createBookmarkMutation.mutate({ postId: post.id });
  };

  const handleRemoveBookmark = () => {
    if (removeBookmarkMutation.isPending) return;
    removeBookmarkMutation.mutate({ postId: post.id });
  };

  if (postEngagement === undefined) {
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
      <PostEngagement
        handlerFns={{
          handleLikePost,
          handleDislikePost,
          handleCreateBookmark,
          handleRemoveBookmark,
        }}
        postEngagement={postEngagement!}
        post={post}
      />
    </div>
  );
}

interface PostEngagementProps {
  handlerFns: {
    handleLikePost: () => void;
    handleDislikePost: () => void;
    handleCreateBookmark: () => void;
    handleRemoveBookmark: () => void;
  };
  postEngagement: PostEngagementType | null;
  post: Post;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
}

function PostEngagement(props: PostEngagementProps) {
  const { handlerFns, postEngagement, post, onCommentMutation } = props;
  const {
    handleDislikePost,
    handleLikePost,
    handleCreateBookmark,
    handleRemoveBookmark,
  } = handlerFns;
  const [isCreateCommentModalOpen, setIsCreateCommentModalOpen] =
    useState(false);

  const modifiedOnCommentMutation = onCommentMutation && {
    ...onCommentMutation,
    onSuccess: () => {
      onCommentMutation?.onSuccess();
      setIsCreateCommentModalOpen(false);
    },
  };

  // console.log("postEngagement -", postEngagement);

  return (
    <>
      <>
        <>
          {postEngagement?.isPostLikedBySessionUser ? (
            <div
              onClick={handleDislikePost}
              className="flex gap-1 justify-center items-center cursor-pointer"
            >
              <Heart size={17} strokeWidth={0} className="fill-red-600" />
              <h1 className="text-xs text-red-600">
                {postEngagement.likesCount}
              </h1>
            </div>
          ) : (
            <div
              onClick={handleLikePost}
              className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400"
            >
              <Heart size={17} />
              <h1 className="text-xs">
                {postEngagement?.likesCount ? postEngagement.likesCount : 0}
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
            {postEngagement?.commentsCount ? postEngagement.commentsCount : 0}
          </h1>
        </div>
        <div className="flex gap-1 justify-center items-center cursor-pointer transition-all hover:text-zinc-400">
          <Send size={17} />
          <h1 className="text-xs">0</h1>
        </div>
        <>
          {postEngagement?.isPostBookmarkedBySessionUser ? (
            <Bookmark
              onClick={handleRemoveBookmark}
              size={17}
              strokeWidth={0}
              className="fill-zinc-200 cursor-pointer"
            />
          ) : (
            <Bookmark
              onClick={handleCreateBookmark}
              size={17}
              className="cursor-pointer transition-all hover:text-zinc-400"
            />
          )}
        </>
      </>
      <>
        {isCreateCommentModalOpen && (
          <PostCommentModal
            mode={COMMENT_MODE.CREATE_COMMENT_ON_POST}
            onClose={() => setIsCreateCommentModalOpen(false)}
            post={post}
            postEngagement={postEngagement!}
            onCommentMutation={modifiedOnCommentMutation as any}
          />
        )}
      </>
    </>
  );
}

// -----------------------------------------------------------------------------------
