"use client";

import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import SocialButtons from "./social-buttons";
import { Tweet, User } from "@/gql/graphql";
import { FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
import PostTweetModal, { MODE } from "./post-tweet-modal";
import DeleteTweetModal from "./delete-tweet-modal";

interface EditOrDeleteTweetButtonsProps {
  author: User;
  tweet: Tweet;
}

export default function EditOrDeleteTweetButtons(
  props: EditOrDeleteTweetButtonsProps
) {
  const { author, tweet } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const [isEditTweetModalOpen, setIsEditTweetModalOpen] = useState(false);
  const [isDeleteTweetModalOpen, setIsDeleteTweetModalOpen] = useState(false);

  if (sessionUser?.username !== author.username)
    return <SocialButtons targetUser={author} className="px-3 py-2 text-sm" />;

  return (
    <>
      <div className="flex gap-1">
        <div
          className="bg-white text-black p-1 rounded-full transition-all cursor-pointer hover:bg-zinc-200"
          title="Edit this tweet"
          onClick={() => setIsEditTweetModalOpen(true)}
        >
          <FilePenLine size={15} />
        </div>
        <div
          className="bg-red-700 p-1 rounded-full transition-all cursor-pointer hover:bg-red-800"
          title="Delete this tweet?"
          onClick={() => setIsDeleteTweetModalOpen(true)}
        >
          <Trash2 size={15} className="transition-all text-white" />
        </div>
      </div>

      {isEditTweetModalOpen && (
        <PostTweetModal
          mode={MODE.EDIT_TWEET}
          onClose={() => setIsEditTweetModalOpen(false)}
          tweet={tweet}
        />
      )}

      {isDeleteTweetModalOpen && (
        <DeleteTweetModal
          tweetId={tweet.id}
          setIsDeleteTweetModalOpen={setIsDeleteTweetModalOpen}
        />
      )}
    </>
  );
}
