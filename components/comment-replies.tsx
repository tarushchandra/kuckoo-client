import { useCommentReplies } from "@/hooks/queries/tweet-engagement";
import CommentCard from "./comment-card";
import { Tweet } from "@/gql/graphql";

interface CommentRepliesProps {
  commentId: string;
  tweet: Tweet;
  setParentCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentReplies(props: CommentRepliesProps) {
  const { commentId, tweet, setParentCommentsCount } = props;
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
            tweet={tweet}
            setParentCommentsCount={setParentCommentsCount}
          />
        ))}
      </div>
    </>
  );
}
