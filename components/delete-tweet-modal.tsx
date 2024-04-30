import { useDeleteTweet } from "@/hooks/mutations/tweet";
import Modal from "./ui/modal";

interface DeleteTweetModalProps {
  setIsDeleteTweetModalOpen: (isOpen: boolean) => void;
  tweetId: string;
  sessionUsername: string;
}

export default function DeleteTweetModal(props: DeleteTweetModalProps) {
  const { setIsDeleteTweetModalOpen, sessionUsername, tweetId } = props;
  const deleteTweetMutation = useDeleteTweet(sessionUsername);

  return (
    <Modal
      wrapperId="delete-tweet-modal"
      onClose={() => setIsDeleteTweetModalOpen(false)}
    >
      <div className="p-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-center">Delete Tweet?</h1>
          <h2 className="text-zinc-400">
            Do you really want to delete this tweet?
          </h2>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-white text-black border border-zinc-800 font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] hover:bg-zinc-200"
            onClick={() => setIsDeleteTweetModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 font-semibold text-white px-4 py-1 rounded-full cursor-pointer transition-all hover:bg-red-700 active:scale-[0.95] disabled:cursor-wait"
            onClick={async () => {
              await deleteTweetMutation.mutateAsync({ tweetId });
              setIsDeleteTweetModalOpen(false);
            }}
            disabled={deleteTweetMutation.isPending}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
