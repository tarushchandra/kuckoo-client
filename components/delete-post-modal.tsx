import { useDeletePost } from "@/hooks/mutations/post";
import Modal from "./ui/modal";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";

interface DeletePostModalProps {
  setIsDeletePostModalOpen: (isOpen: boolean) => void;
  postId: string;
}

export default function DeletePostModal(props: DeletePostModalProps) {
  const { setIsDeletePostModalOpen, postId } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const deletePostMutation = useDeletePost(sessionUser?.username!);

  return (
    <Modal
      wrapperId="delete-post-modal"
      onClose={() => setIsDeletePostModalOpen(false)}
      modalClassName="z-[1000]"
      bgClassName="z-[500]"
    >
      <div className="p-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-center">Delete Post?</h1>
          <h2 className="text-zinc-400">
            Do you really want to delete this post?
          </h2>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-white text-black border border-zinc-800 font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] hover:bg-zinc-200"
            onClick={() => setIsDeletePostModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 font-semibold text-white px-4 py-1 rounded-full cursor-pointer transition-all hover:bg-red-700 active:scale-[0.95] disabled:cursor-wait"
            onClick={async () => {
              await deletePostMutation.mutateAsync({ postId });
              setIsDeletePostModalOpen(false);
            }}
            disabled={deletePostMutation.isPending}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
