import Modal from "./ui/modal";
import CreatePost from "./create-post";
import { Post } from "@/gql/graphql";

export enum MODE {
  CREATE_POST,
  EDIT_POST,
}

interface CreatePostModalProps {
  mode: MODE;
  onClose: () => void;
  post?: Post;
}

export default function CreatePostModal(props: CreatePostModalProps) {
  const { onClose, mode, post } = props;

  return (
    <Modal
      wrapperId="post-post-modal"
      onClose={onClose}
      modalClassName="z-[1000]"
      bgClassName="z-[500]"
    >
      <div className="p-6">
        {mode === MODE.CREATE_POST && (
          <>
            <h1 className="text-2xl font-bold text-center">Create Post</h1>
            <CreatePost mode={MODE.CREATE_POST} onClose={onClose} />
          </>
        )}

        {mode === MODE.EDIT_POST && (
          <>
            <h1 className="text-2xl font-bold text-center">Edit Post</h1>
            <CreatePost mode={MODE.EDIT_POST} onClose={onClose} post={post} />
          </>
        )}
      </div>
    </Modal>
  );
}
