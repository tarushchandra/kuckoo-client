import Modal from "./ui/modal";
import PostTweet from "./post-tweet";
import { Tweet } from "@/gql/graphql";

export enum MODE {
  CREATE_TWEET,
  EDIT_TWEET,
}

interface PostTweetModalProps {
  mode: MODE;
  onClose: () => void;
  tweet?: Tweet;
}

export default function PostTweetModal(props: PostTweetModalProps) {
  const { onClose, mode, tweet } = props;

  return (
    <Modal wrapperId="post-tweet-modal" onClose={onClose}>
      <div className="p-6">
        {mode === MODE.CREATE_TWEET && (
          <>
            <h1 className="text-2xl font-bold text-center">Create Tweet</h1>
            <PostTweet mode={MODE.CREATE_TWEET} onClose={onClose} />
          </>
        )}

        {mode === MODE.EDIT_TWEET && (
          <>
            <h1 className="text-2xl font-bold text-center">Edit Tweet</h1>
            <PostTweet mode={MODE.EDIT_TWEET} onClose={onClose} tweet={tweet} />
          </>
        )}
      </div>
    </Modal>
  );
}
