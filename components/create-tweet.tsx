"use client";
import { useAuth } from "@/hooks/auth";
import { useCreateTweet } from "@/hooks/mutations/tweet";
import { useSelectAndUploadImage } from "@/hooks/services/tweet";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Skeleton from "./ui/skeleton";
import mergeClasses from "@/utils/mergeClasses";

interface CreateTweetProps {
  onClose?: () => void;
  showCancelButton: boolean;
  containerClassName?: string;
  buttonClassName?: string;
}

export default function CreateTweet(props: CreateTweetProps) {
  const { onClose, showCancelButton, containerClassName, buttonClassName } =
    props;
  const { data: sessionUser } = useAuth(selectUser);
  const createTweetMutation = useCreateTweet(sessionUser?.username!);
  const [textContent, setTextContent] = useState("");
  const [showRemoveImageButton, setShowRemoveImageButton] = useState(false);

  const { uploadedImageURL, setUploadedImageURL, handleSelectAndUploadImage } =
    useSelectAndUploadImage();

  const handleCreateTweet = async () => {
    await createTweetMutation.mutateAsync({
      content: textContent,
      imageURL: uploadedImageURL,
    });
    setTextContent("");
    setUploadedImageURL("");

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
          {uploadedImageURL && (
            <div className="w-full h-80 relative">
              <Image
                src={uploadedImageURL}
                alt="uploaded-image"
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
                    setUploadedImageURL("");
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
              onClick={() => handleSelectAndUploadImage(setUploadedImageURL)}
            />
          </div>

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
              disabled={!textContent && !uploadedImageURL}
              className={mergeClasses(
                "bg-[#1D9BF0] font-bold text-white cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95] disabled:bg-sky-900 disabled:text-zinc-500 disabled:cursor-not-allowed",
                buttonClassName
              )}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
