"use client";
import Modal from "./ui/modal";
import Image from "next/image";
import Link from "next/link";
import EditOrDeleteTweetButtons from "./edit-delete-tweet-buttons";
import TweetLikes from "./tweet-likes";
import { TweetEngagementForModal } from "./tweet-engagement";
import TweetComments from "./tweet-comments";
import { Tweet } from "@/gql/graphql";
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

interface TweetModalProps {
  tweet: Tweet;
}

export default function TweetModal(props: TweetModalProps) {
  const router = useRouter();
  const onClose = () => router.back();
  const { tweet } = props;
  const { author, content, imageURL, createdAt, updatedAt, id } = tweet;
  const [isTweetInfoPanelActive, setIsTweetInfoPanelActive] = useState(true);

  const tweetCreatedAt = dayjs(Number(createdAt));
  const tweetUpdatedAt = dayjs(Number(updatedAt));
  const formattedCreatedDate = tweetCreatedAt.format("MMMM D, YYYY");
  const formattedCreatedTime = tweetCreatedAt.format("h:mm A");
  const formattedUpdatedDate = tweetUpdatedAt.format("MMMM D, YYYY");
  const formattedUpdatedTime = tweetUpdatedAt.format("h:mm A");
  const formattedCreatedDateFromNow = tweetCreatedAt.fromNow();

  return (
    <Modal
      onClose={onClose}
      wrapperId="tweet-modal"
      modalClassName={mergeClasses(
        "bg-transparent overflow-y-auto",
        imageURL! && "xs:h-full xs:w-full"
      )}
    >
      <div
        className={mergeClasses(
          "flex xs:flex-col md:flex-row md:h-full ",
          !isTweetInfoPanelActive && "h-full justify-center"
        )}
      >
        <div
          className={mergeClasses(
            "relative h-full",
            // isTweetInfoPanelActive && "md:w-1/2 lg:w-2/3"
            isTweetInfoPanelActive && "md:flex-1"
          )}
        >
          <>
            {imageURL && (
              <div className="flex justify-center items-center w-full h-full border-r border-zinc-800">
                <Image
                  src={imageURL!}
                  alt="tweet-image"
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
            {isTweetInfoPanelActive ? (
              <>
                <ChevronsDown
                  onClick={() => setIsTweetInfoPanelActive(false)}
                  size={22}
                  className="md:hidden absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
                <ChevronsRight
                  onClick={() => setIsTweetInfoPanelActive(false)}
                  size={22}
                  className="hidden md:block absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
              </>
            ) : (
              <>
                <ChevronsUp
                  onClick={() => setIsTweetInfoPanelActive(true)}
                  size={22}
                  className="md:hidden absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
                <ChevronsLeft
                  onClick={() => setIsTweetInfoPanelActive(true)}
                  size={22}
                  className="hidden md:block absolute top-2 right-2 bg-black rounded-full p-1 cursor-pointer text-white transition-all hover:text-white"
                />
              </>
            )}
          </>
        </div>
        <>
          {isTweetInfoPanelActive && (
            <div
              className={mergeClasses(
                "bg-black p-8 flex flex-col gap-2",
                imageURL && "p-4",
                // isTweetInfoPanelActive && "md:w-1/2 lg:w-1/3"
                isTweetInfoPanelActive && "md:w-[400px] xl:w-[500px]"
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
                <EditOrDeleteTweetButtons
                  author={tweet.author!}
                  tweet={tweet}
                />
              </div>
              <p className="text-md">{content}</p>
              <>
                {tweet.createdAt === tweet.updatedAt ? (
                  <div className="flex justify-between items-center">
                    <TweetLikes tweetId={id} />
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
                    <TweetLikes tweetId={id} />
                  </>
                )}
              </>
              <TweetEngagementForModal
                tweet={{ ...tweet, createdAt: formattedCreatedDateFromNow }}
              />
              <TweetComments
                tweet={{ ...tweet, createdAt: formattedCreatedDateFromNow }}
              />
            </div>
          )}
        </>
      </div>
    </Modal>
  );
}
