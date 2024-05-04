import Modal from "./ui/modal";
import PostTweet, { MODE } from "./post-tweet";

interface CreateTweetModalProps {
  setIsCreateTweetModalOpen: (isOpen: boolean) => void;
}

export default function CreateTweetModal(props: CreateTweetModalProps) {
  const { setIsCreateTweetModalOpen } = props;
  const onClose = () => setIsCreateTweetModalOpen(false);

  return (
    <Modal wrapperId="create-tweet-modal" onClose={onClose}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center">Create Tweet</h1>
        <PostTweet
          onClose={onClose}
          showCancelButton={true}
          mode={MODE.CREATE_TWEET}
        />
      </div>
    </Modal>
  );
}
