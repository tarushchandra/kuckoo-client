import Modal from "./ui/modal";
import { Tweet, User } from "@/gql/graphql";
import PostTweet, { MODE } from "./post-tweet";

interface EditTweetModalProps {
  tweet: Tweet;
  setIsEditTweetModalOpen: (isOpen: boolean) => void;
  sessionUser: User;
}

export default function EditTweetModal(props: EditTweetModalProps) {
  const { setIsEditTweetModalOpen, tweet } = props;
  const onClose = () => setIsEditTweetModalOpen(false);

  return (
    <Modal wrapperId="edit-tweet-modal" onClose={onClose}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center">Edit Tweet</h1>
        <PostTweet
          mode={MODE.EDIT_TWEET}
          onClose={onClose}
          showCancelButton={true}
          tweet={tweet}
        />
      </div>
    </Modal>
  );
}

{
  /* <div className="rounded-md p-8 flex flex-col gap-4">
  <div className="flex flex-col gap-2">
    <h1 className="text-2xl font-bold text-center">Edit Tweet</h1>
    <textarea
      rows={4}
      cols={37}
      className="bg-black border-b text-lg border-zinc-800 outline-none"
      value={updatedTextContent}
      onChange={(e) => setUpdatedTextContent(e.target.value)}
      placeholder={`What's on your mind, ${sessionUser.firstName}?`}
    />
  </div>
  <div className="flex gap-2 justify-center">
    <button
      className="bg-white text-black border border-zinc-800 font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] hover:bg-zinc-200"
      onClick={() => {
        setUpdatedTextContent(textContent);
        setIsEditTweetModalOpen(false);
      }}
    >
      Cancel
    </button>
    <button
      className="bg-[#1D9BF0] text-white font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] disabled:cursor-wait hover:bg-[#1993e6]"
      disabled={editTweetMutation.isPending}
      onClick={async () => {
        if (textContent !== updatedTextContent)
          await editTweetMutation.mutateAsync({
            tweetId,
            content: updatedTextContent,
          });
        setIsEditTweetModalOpen(false);
      }}
    >
      Save Changes
    </button>
  </div>
</div>; */
}
