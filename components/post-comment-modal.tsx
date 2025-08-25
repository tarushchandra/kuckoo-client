import {
  Comment,
  Post,
  PostEngagement as PostEngagementType,
} from "@/gql/graphql";
import Modal from "./ui/modal";
import PostComment from "./post-comment";
import { X } from "lucide-react";

export enum COMMENT_MODE {
  CREATE_COMMENT_ON_POST,
  EDIT_COMMENT_ON_POST,
  CREATE_REPLY_ON_COMMENT,
  EDIT_REPLY_ON_COMMENT,
}

interface PostCommentModalProps {
  mode: COMMENT_MODE;
  onClose: () => void;
  post: Post;
  postEngagement?: PostEngagementType;
  comment?: Comment;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
}

export default function PostCommentModal(props: PostCommentModalProps) {
  const { onClose, mode, post, postEngagement, onCommentMutation, comment } =
    props;

  return (
    <Modal
      wrapperId="post-comment-modal"
      onClose={onClose}
      modalClassName="z-[1000]"
      bgClassName="z-[500]"
    >
      <>
        <div className="p-6 w-[35rem]">
          {mode === COMMENT_MODE.CREATE_COMMENT_ON_POST && (
            <PostComment
              mode={mode}
              onClose={onClose}
              post={post}
              postEngagement={postEngagement}
              onCommentMutation={onCommentMutation}
            />
          )}

          {mode === COMMENT_MODE.EDIT_COMMENT_ON_POST && (
            <PostComment
              mode={mode}
              post={post}
              comment={comment as any}
              onClose={onClose}
            />
          )}

          {mode === COMMENT_MODE.CREATE_REPLY_ON_COMMENT && (
            <PostComment
              mode={mode}
              onClose={onClose}
              post={post}
              comment={comment as any}
              onCommentMutation={onCommentMutation}
            />
          )}

          {mode === COMMENT_MODE.EDIT_REPLY_ON_COMMENT && (
            <PostComment
              mode={mode}
              onClose={onClose}
              post={post}
              comment={comment as any}
            />
          )}
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
