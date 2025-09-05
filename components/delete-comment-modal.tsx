import { useDeletePost } from "@/hooks/mutations/post";
import Modal from "./ui/modal";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { useDeleteComment } from "@/hooks/mutations/post-engagement";
import Image from "next/image";
import { Comment, User } from "@/gql/graphql";

interface DeletePostModalProps {
  onClose: () => void;
  postId: string;
  comment: Comment;
  onCommentMutation: () => void;
}

export default function DeleteCommentModal(props: DeletePostModalProps) {
  const { onClose, postId, comment, onCommentMutation } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const deleteCommentMutation = useDeleteComment();

  return (
    <Modal
      wrapperId="delete-post-modal"
      onClose={onClose}
      modalClassName="z-[1000]"
      bgClassName="z-[500]"
    >
      <div className="p-6 flex flex-col gap-4 w-[35rem]">
        <div className="flex py-4 gap-2 items-start border-b border-zinc-800">
          <Image
            src={sessionUser?.profileImageURL!}
            alt="session-user-image"
            width={40}
            height={40}
            className="rounded-full transition-all hover:opacity-90"
          />
          <div className="text-sm flex flex-col w-full">
            <div className="flex gap-2 items-center">
              <h1 className="font-semibold hover:underline">
                {sessionUser?.firstName} {sessionUser?.lastName}
              </h1>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <span>@{sessionUser?.username}</span>
                <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                <span>{comment.createdAt}</span>
              </div>
            </div>
            <p>{comment.content}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-lg font-bold text-center">Delete Comment?</h1>
            <h2 className="text-zinc-400 text-sm text-center">
              Do you really want to delete this comment?
            </h2>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              className="bg-white text-black border border-zinc-800 font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] hover:bg-zinc-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 font-semibold text-white px-4 py-1 rounded-full cursor-pointer transition-all hover:bg-red-700 active:scale-[0.95] disabled:cursor-wait"
              onClick={async () => {
                await deleteCommentMutation.mutateAsync({
                  postId,
                  commentId: comment.id,
                  parentCommentId: comment.parentComment?.id!,
                });
                onCommentMutation();
                onClose();
              }}
              disabled={deleteCommentMutation.isPending}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
