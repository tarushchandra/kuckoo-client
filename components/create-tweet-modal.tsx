import Image from "next/image";
import Modal from "./ui/modal";
import { ImageIcon } from "lucide-react";
import { useCreateTweet } from "@/hooks/mutations/tweet";
import { useState } from "react";
import { User } from "@/gql/graphql";

interface CreateTweetModalProps {
  sessionUser: User;
  setIsCreateTweetModalOpen: (isOpen: boolean) => void;
}

export default function CreateTweetModal(props: CreateTweetModalProps) {
  const { sessionUser, setIsCreateTweetModalOpen } = props;
  const [textContent, setTextContent] = useState("");
  const createTweetMutation = useCreateTweet(sessionUser.username!);

  return (
    <Modal
      wrapperId="create-tweet-modal"
      onClose={() => setIsCreateTweetModalOpen(false)}
    >
      <div className="p-8 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-center">Create Tweet</h1>
        <div className=" flex gap-3">
          <div>
            <Image
              src={sessionUser?.profileImageURL!}
              alt="session-user-image"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <textarea
              name="tweet-input"
              id="tweet-input"
              rows={4}
              cols={37}
              className="bg-black w-full text-xl focus:outline-none my-[0.34rem] border-b border-b-zinc-800"
              placeholder={`What's on your mind, ${sessionUser?.firstName}?`}
              onChange={(e) => setTextContent(e.target.value)}
              value={textContent}
            />
            <div className="flex justify-between items-center">
              <ImageIcon className="text-[#1D9BF0] cursor-pointer" size={20} />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCreateTweetModalOpen(false)}
                  className="bg-white text-black border border-zinc-800 font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (textContent)
                      await createTweetMutation.mutateAsync({
                        content: textContent,
                      });
                    setTextContent("");
                    setIsCreateTweetModalOpen(false);
                  }}
                  disabled={createTweetMutation.isPending}
                  className="bg-[#1D9BF0] text-white font-semibold  px-4 py-1 rounded-full cursor-pointer transition-all active:scale-[0.95] disabled:cursor-wait hover:bg-[#1993e6]"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
