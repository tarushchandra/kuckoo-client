import {
  Comment,
  Tweet,
  TweetEngagement as TweetEngagementType,
} from "@/gql/graphql";
import Modal from "./ui/modal";
import PostComment from "./post-comment";
import { X } from "lucide-react";

export enum COMMENT_MODE {
  CREATE_COMMENT_ON_TWEET,
  EDIT_COMMENT_ON_TWEET,
  CREATE_COMMENT_ON_COMMENT,
}

interface PostCommentModalProps {
  mode: COMMENT_MODE;
  onClose: () => void;
  tweet: Tweet;
  tweetEngagement?: TweetEngagementType;
  comment?: Comment;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
}

export default function PostCommentModal(props: PostCommentModalProps) {
  const { onClose, mode, tweet, tweetEngagement, onCommentMutation, comment } =
    props;

  return (
    <Modal wrapperId="post-comment-modal" onClose={onClose}>
      <>
        <div className="p-6 w-[35rem]">
          {mode === COMMENT_MODE.CREATE_COMMENT_ON_TWEET && (
            <PostComment
              mode={COMMENT_MODE.CREATE_COMMENT_ON_TWEET}
              onClose={onClose}
              tweet={tweet}
              tweetEngagement={tweetEngagement}
              onCommentMutation={onCommentMutation}
            />
          )}

          {mode === COMMENT_MODE.EDIT_COMMENT_ON_TWEET && (
            <PostComment
              mode={COMMENT_MODE.EDIT_COMMENT_ON_TWEET}
              tweet={tweet}
              comment={comment as any}
              onClose={onClose}
            />
          )}

          {/* {mode === MODE.CREATE_COMMENT_ON_COMMENT && (
            <PostComment
              mode={MODE.CREATE_COMMENT_ON_COMMENT}
              onClose={onClose}
            />
          )} */}
        </div>
      </>
      <X
        onClick={onClose}
        size={22}
        className="absolute top-2 right-2 bg-zinc-800 rounded-full p-1 cursor-pointer text-zinc-400 transition-all hover:text-white"
      />
    </Modal>
  );
}
