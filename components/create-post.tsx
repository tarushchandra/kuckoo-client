"use client";
import { useAuth } from "@/hooks/auth";
import { useCreatePost, useUpdatePost } from "@/hooks/mutations/post";
import { handleSelectAndUploadImage } from "@/hooks/services/post";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import mergeClasses from "@/utils/mergeClasses";
import { Post } from "@/gql/graphql";
import { MODE } from "./create-post-modal";

interface CreatePostProps {
  mode: MODE;
  onClose?: () => void;
  post?: Post;
  showCancelButton?: boolean;
  containerClassName?: string;
  buttonClassName?: string;
}

export default function CreatePost(props: CreatePostProps) {
  const {
    onClose,
    showCancelButton = true,
    containerClassName,
    buttonClassName,
    mode,
    post,
  } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const createPostMutation = useCreatePost(sessionUser?.username!);
  const editPostMutation = useUpdatePost(sessionUser?.username!);

  const [textContent, setTextContent] = useState(post?.content || "");
  const [imageURL, setImageURL] = useState(post?.imageURL || "");
  const [showRemoveImageButton, setShowRemoveImageButton] = useState(false);
  const [imagePathname, setImagePathname] = useState("");

  const handleCreatePost = async () => {
    await createPostMutation.mutateAsync({
      content: textContent || null,
      imagePathname: imagePathname || null,
    });
    setTextContent("");
    setImageURL("");
    setImagePathname("");

    if (!onClose) return;
    onClose();
  };

  const handleEditPost = async () => {
    await editPostMutation.mutateAsync({
      postId: post?.id!,
      payload: {
        content: textContent || null,
        imagePathname: imageURL || null,
      },
    });
    setTextContent("");
    setImageURL("");
    setImagePathname("");

    if (!onClose) return;
    onClose();
  };

  return (
    <div className={mergeClasses("px-4 py-2 gap-3", containerClassName)}>
      <div className="">
        <Image
          src={sessionUser?.profileImageURL!}
          alt="session-user-image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <textarea
          name="post-input"
          id="post-input"
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
                alt="post-image"
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
              className="text-primary"
              size={20}
              onClick={() =>
                handleSelectAndUploadImage(setImageURL, setImagePathname)
              }
            />
          </div>

          {mode === MODE.CREATE_POST && (
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
                onClick={handleCreatePost}
                disabled={
                  createPostMutation.isPending || (!textContent && !imageURL)
                }
                className={mergeClasses(
                  "bg-primary-500 font-bold text-white cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95]",
                  buttonClassName,
                  !textContent &&
                    !imageURL &&
                    "disabled:bg-primary-900 disabled:text-zinc-500 disabled:cursor-not-allowed",
                  createPostMutation.isPending && "cursor-wait"
                )}
              >
                Post
              </button>
            </div>
          )}

          {mode === MODE.EDIT_POST && (
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="bg-white font-bold text-black cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95] disabled:cursor-wait"
              >
                Cancel
              </button>
              <button
                onClick={handleEditPost}
                disabled={
                  editPostMutation.isPending || (!textContent && !imageURL)
                }
                className={mergeClasses(
                  "bg-primary-500 font-bold text-white cursor-pointer px-4 py-1 transition-all rounded-full active:scale-[0.95]",
                  buttonClassName,
                  !textContent &&
                    !imageURL &&
                    "disabled:bg-primary-900 disabled:text-zinc-500 disabled:cursor-not-allowed",
                  editPostMutation.isPending && "cursor-wait"
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
