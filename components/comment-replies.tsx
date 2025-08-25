import { useCommentReplies } from "@/hooks/queries/post-engagement";
import CommentCard from "./comment-card";
import { Post } from "@/gql/graphql";

interface CommentRepliesProps {
  commentId: string;
  post: Post;
  setParentCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentReplies(props: CommentRepliesProps) {
  const { commentId, post, setParentCommentsCount } = props;
  const comments = useCommentReplies(commentId);

  if (!comments)
    return (
      <h1 className="text-sm text-center py-2 text-zinc-500 animate-pulse">
        Loading....
      </h1>
    );

  return (
    <>
      <div className="ml-8">
        {comments?.map((reply: any) => (
          <CommentCard
            key={reply?.id}
            comment={reply}
            post={post}
            setParentCommentsCount={setParentCommentsCount}
          />
        ))}
      </div>
    </>
  );
}
