"use client";
import CommentCard from "./comment-card";
import { usePostComments } from "@/hooks/queries/post-engagement";
import CreateComment from "./create-comment";
import { Post } from "@/gql/graphql";
import { COMMENT_MODE } from "./post-comment-modal";
import CommentCardLoading from "./ui/comment-card-loading";

export default function PostComments({ post }: { post: Post }) {
  const postEngagement = usePostComments(post.id);

  return (
    <div className="h-full w-full border-t border-zinc-800 overflow-y-auto">
      <CreateComment
        post={post}
        postEngagement={postEngagement as any}
        placeholder="Add a comment"
        mode={COMMENT_MODE.CREATE_COMMENT_ON_POST}
      />

      <div>
        {postEngagement === undefined ? (
          Array.from({ length: 7 }, (_, index) => (
            <CommentCardLoading key={index} />
          ))
        ) : (
          <div className="h-full">
            {postEngagement?.comments &&
            postEngagement.comments.length !== 0 ? (
              postEngagement.comments.map((comment: any) => (
                <CommentCard key={comment?.id} comment={comment} post={post} />
              ))
            ) : (
              <h1 className="text-center pt-2 font-semibold">No comments</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
