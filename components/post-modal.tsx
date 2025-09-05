"use client";
import Modal from "./ui/modal";
import Image from "next/image";
import Link from "next/link";
import EditOrDeletePostButtons from "./edit-delete-post-buttons";
import PostLikes from "./post-likes";
import { PostEngagementForModal } from "./post-engagement";
import PostComments from "./post-comments";
import { Post } from "@/gql/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import {
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  X,
} from "lucide-react";
import mergeClasses from "@/utils/mergeClasses";
import { useState } from "react";

dayjs.extend(relativeTime);

interface PostModalProps {
  post: Post;
}

export default function PostModal(props: PostModalProps) {
  const router = useRouter();
  const onClose = () => router.back();
  const { post } = props;
  const { author, content, imageURL, createdAt, updatedAt, id } = post;
  const [isPostInfoPanelActive, setIsPostInfoPanelActive] = useState(true);

  const postCreatedAt = dayjs(Number(createdAt));
  const postUpdatedAt = dayjs(Number(updatedAt));
  const formattedCreatedDate = postCreatedAt.format("MMMM D, YYYY");
  const formattedCreatedTime = postCreatedAt.format("h:mm A");
  const formattedUpdatedDate = postUpdatedAt.format("MMMM D, YYYY");
  const formattedUpdatedTime = postUpdatedAt.format("h:mm A");
  const formattedCreatedDateFromNow = postCreatedAt.fromNow();

  return (
    <Modal
      onClose={onClose}
      wrapperId="post-modal"
      modalClassName={mergeClasses(
        "bg-transparent overflow-y-auto",
        imageURL! && "xs:h-full xs:w-full"
      )}
    >
      <div
        className={mergeClasses(
          "flex xs:flex-col md:flex-row md:h-full",
          !isPostInfoPanelActive && "h-full justify-center"
        )}
      >
        <div
          className={mergeClasses(
            "relative h-full",
            isPostInfoPanelActive && "md:flex-1"
          )}
        >
          <>
            {imageURL && (
              <div
                className={mergeClasses(
                  "flex justify-center items-center w-full h-full",
                  isPostInfoPanelActive && "border-r border-zinc-800"
                )}
              >
                <Image
                  src={imageURL!}
                  alt="post-image"
                  width={1280}
                  height={720}
                  className="object-cover"
                />
              </div>
            )}
          </>
          <X
            onClick={onClose}
            size={22}
            className="absolute top-2 left-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
          />
          <>
            {isPostInfoPanelActive ? (
              <>
                <ChevronsDown
                  onClick={() => setIsPostInfoPanelActive(false)}
                  size={22}
                  className="md:hidden absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
                <ChevronsRight
                  onClick={() => setIsPostInfoPanelActive(false)}
                  size={22}
                  className="hidden md:block absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
              </>
            ) : (
              <>
                <ChevronsUp
                  onClick={() => setIsPostInfoPanelActive(true)}
                  size={22}
                  className="md:hidden absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
                <ChevronsLeft
                  onClick={() => setIsPostInfoPanelActive(true)}
                  size={22}
                  className="hidden md:block absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
              </>
            )}
          </>
        </div>
        <>
          {isPostInfoPanelActive && (
            <div
              className={mergeClasses(
                "bg-black p-8 flex flex-col gap-2 h-full",
                imageURL && "p-4",
                isPostInfoPanelActive && "md:w-[400px] xl:w-[500px]"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Link href={`/profile/${author?.username}`}>
                    <Image
                      src={author?.profileImageURL!}
                      alt="user-image"
                      className="rounded-full transition-all hover:opacity-90"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link
                      href={`/profile/${author?.username}`}
                      className="font-semibold hover:underline font-sm"
                    >
                      {author?.firstName} {author?.lastName}
                    </Link>
                    <h2 className="text-sm text-zinc-500">
                      @{author?.username}
                    </h2>
                  </div>
                </div>
                <EditOrDeletePostButtons author={post.author!} post={post} />
              </div>
              <p className="text-md">{content}</p>
              <>
                {post.createdAt === post.updatedAt ? (
                  <div className="flex justify-between items-center">
                    <PostLikes postId={id} />
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <h2>{formattedCreatedDate}</h2>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-zinc-500 font-semibold">
                      <h2>
                        Created - {formattedCreatedDate} at{" "}
                        {formattedCreatedTime}
                      </h2>
                      <h2>
                        Edited - {formattedUpdatedDate} at{" "}
                        {formattedUpdatedTime}
                      </h2>
                    </div>
                    <PostLikes postId={id} />
                  </>
                )}
              </>
              <PostEngagementForModal
                post={{ ...post, createdAt: formattedCreatedDateFromNow }}
              />
              <PostComments
                post={{ ...post, createdAt: formattedCreatedDateFromNow }}
              />
            </div>
          )}
        </>
      </div>
    </Modal>
  );
}
