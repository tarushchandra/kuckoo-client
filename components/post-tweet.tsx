"use client";
import { useAuth } from "@/hooks/auth";
import { useCreateTweet, useUpdateTweet } from "@/hooks/mutations/tweet";
import { handleSelectAndUploadImage } from "@/hooks/services/tweet";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import mergeClasses from "@/utils/mergeClasses";
import { Tweet } from "@/gql/graphql";

export enum MODE {
  CREATE_TWEET,
  EDIT_TWEET,
}

interface PostTweetProps {
  mode: MODE;
  onClose?: () => void;
  tweet?: Tweet;
  showCancelButton: boolean;
  containerClassName?: string;
  buttonClassName?: string;
}

export default function PostTweet(props: PostTweetProps) {
  const {
    onClose,
    showCancelButton,
    containerClassName,
    buttonClassName,
    mode,
    tweet,
  } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const createTweetMutation = useCreateTweet(sessionUser?.username!);
  const editTweetMutation = useUpdateTweet(sessionUser?.username!);

  const [textContent, setTextContent] = useState(tweet?.content || "");
  const [imageURL, setImageURL] = useState(tweet?.imageURL || "");
  const [showRemoveImageButton, setShowRemoveImageButton] = useState(false);

  const handleCreateTweet = async () => {
    await createTweetMutation.mutateAsync({
      content: textContent || null,
      imageURL: imageURL || null,
    });
    setTextContent("");
    setImageURL("");

    if (!onClose) return;
    onClose();
  };

  const handleEditTweet = async () => {
    await editTweetMutation.mutateAsync({
      tweetId: tweet?.id!,
      payload: { content: textContent || null, imageURL: imageURL || null },
    });
    setTextContent("");
    setImageURL("");

    if (!onClose) return;
    onClose();
  };

  return (
    <div className={mergeClasses("px-4 py-2 flex gap-3", containerClassName)}>
      <div>
        <Image
          src={sessionUser?.profileImageURL!}
          alt="session-user-image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2">
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
        <>
          {imageURL && (
            <div className="w-full h-80 relative">
              <Image
                src={imageURL}
                alt="tweet-image"
                className="rounded-lg w-full h-full object-cover"
                width={600}
                height={600}
                onLoad={() => setShowRemoveImageButton(true)}
              />
              {showRemoveImageButton && (
                <X
                  className="absolute top-1 right-1 bg-black opacity-60 rounded-full p-1 cursor-pointer transition-all hover:opacity-100"
                  size={25}
                  onClick={() => {
                    setImageURL("");
                    setShowRemoveImageButton(false);
                  }}
                />
              )}
            </div>
          )}
        </>
        <div className="flex justify-between items-center py-1">
          <div className="rounded-full cursor-pointer p-[0.4rem] transition-all hover:bg-[#051f30]">
            <ImageIcon
              className="text-[#1D9BF0]"
              size={20}
              onClick={() => handleSelectAndUploadImage(setImageURL)}
            />
          </div>

          {mode === MODE.CREATE_TWEET && (
            <div className="flex gap-2">
              {showCancelButton && (
                <button
                  onClick={onClose}
                  className="bg-white font-bold text-black cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95] disabled:cursor-wait"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleCreateTweet}
                disabled={
                  createTweetMutation.isPending || (!textContent && !imageURL)
                }
                className={mergeClasses(
                  "bg-[#1D9BF0] font-bold text-white cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95]",
                  buttonClassName,
                  !textContent &&
                    !imageURL &&
                    "disabled:bg-sky-900 disabled:text-zinc-500 disabled:cursor-not-allowed",
                  createTweetMutation.isPending && "cursor-wait"
                )}
              >
                Tweet
              </button>
            </div>
          )}

          {mode === MODE.EDIT_TWEET && (
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="bg-white font-bold text-black cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95] disabled:cursor-wait"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTweet}
                disabled={
                  editTweetMutation.isPending || (!textContent && !imageURL)
                }
                className={mergeClasses(
                  "bg-[#1D9BF0] font-bold text-white cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95]",
                  buttonClassName,
                  !textContent &&
                    !imageURL &&
                    "disabled:bg-sky-900 disabled:text-zinc-500 disabled:cursor-not-allowed",
                  editTweetMutation.isPending && "cursor-wait"
                )}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
