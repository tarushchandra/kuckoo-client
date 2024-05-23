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
import { X } from "lucide-react";
import mergeClasses from "@/utils/mergeClasses";

dayjs.extend(relativeTime);

interface TweetModalProps {
  tweet: Tweet;
}

export default function TweetModal(props: TweetModalProps) {
  const router = useRouter();
  const onClose = () => router.back();
  const { tweet } = props;
  const { author, content, imageURL, createdAt, updatedAt, id } = tweet;

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
      modalClassName={imageURL! && "w-[90%]"}
    >
      <div className="h-[55rem] flex">
        <>
          {imageURL && (
            <div className="w-[70%] flex items-center border-r border-zinc-800">
              <Image
                src={imageURL!}
                alt="tweet-image"
                width={1280}
                height={720}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </>
        <div
          className={mergeClasses(
            "w-full p-8 flex flex-col gap-2",
            imageURL && "w-[32%] p-4"
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
                <h2 className="text-sm text-zinc-500">@{author?.username}</h2>
              </div>
            </div>
            <EditOrDeleteTweetButtons author={tweet.author!} tweet={tweet} />
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
                    Created - {formattedCreatedDate} at {formattedCreatedTime}
                  </h2>
                  <h2>
                    Edited - {formattedUpdatedDate} at {formattedUpdatedTime}
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
        <X
          onClick={onClose}
          size={22}
          className="fixed top-2 left-2 bg-zinc-800 rounded-full p-1 cursor-pointer text-zinc-400 transition-all hover:text-white"
        />
      </div>
    </Modal>
  );
}
