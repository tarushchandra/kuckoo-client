"use client";
import { User } from "@/gql/graphql";
import dayjs from "dayjs";
import {
  Bookmark,
  FilePenLine,
  Heart,
  MessageCircle,
  Send,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteTweetModal from "./delete-tweet-modal";
import EditTweetModal from "./edit-tweet-modal";

dayjs.extend(relativeTime);

const postButtons = [
  {
    id: 1,
    Icon: Heart,
    title: "Like",
  },
  {
    id: 2,
    Icon: MessageCircle,
    title: "Comment",
  },
  {
    id: 3,
    Icon: Send,
    title: "Share",
  },
];

interface TweetCardProps {
  tweet: {
    id: string;
    content: string;
    imageURL: string;
    createdAt: string;
    author: User;
  };
  sessionUser: User;
}

const TweetCard: React.FC<TweetCardProps> = (props) => {
  const { tweet, sessionUser } = props;
  const { id, content, createdAt, author, imageURL } = tweet;
  const { firstName, lastName, username } = author;
  const formattedCreatedAt = dayjs(Number(createdAt)).fromNow();

  const [isDeleteTweetModalOpen, setIsDeleteTweetModalOpen] = useState(false);
  const [isEditTweetModalOpen, setIsEditTweetModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-start gap-3 cursor-pointer border-y border-t-0 border-zinc-800 transition-all p-3 hover:bg-zinc-900">
        <Image
          src={tweet.author.profileImageURL!}
          alt="user-image"
          className="rounded-full"
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-[0.1rem]">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <h1 className="font-semibold">
                  {firstName} {lastName}
                </h1>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <span>@{username}</span>
                  <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                  <span>{formattedCreatedAt}</span>
                </div>
              </div>
              <>
                {sessionUser.username === author.username && (
                  <div className="flex gap-1">
                    <div
                      className="bg-white text-black p-1 rounded-full transition-all hover:bg-zinc-200"
                      title="Edit this tweet"
                      onClick={() => setIsEditTweetModalOpen(true)}
                    >
                      <FilePenLine size={15} />
                    </div>
                    <div
                      className="bg-red-700 p-1 rounded-full transition-all hover:bg-red-800"
                      title="Delete this tweet?"
                      onClick={() => setIsDeleteTweetModalOpen(true)}
                    >
                      <Trash2 size={15} className="transition-all text-white" />
                    </div>
                  </div>
                )}
              </>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">{content}</p>
              {imageURL && (
                <Image
                  src={imageURL}
                  alt="tweet-image"
                  className="rounded-xl w-full h-full border border-zinc-800"
                  width={600}
                  height={600}
                />
              )}
            </div>
          </div>
          <div className="text-zinc-500 flex justify-between px-10 pt-1">
            {postButtons.map((btn) => {
              return (
                <div
                  key={btn.id}
                  className={`flex gap-1 justify-center items-center`}
                >
                  <span>{<btn.Icon size={17} />}</span>
                  <h1 className="text-xs">0</h1>
                </div>
              );
            })}
            <Bookmark size={17} />
          </div>
        </div>
      </div>

      {isEditTweetModalOpen && (
        <EditTweetModal
          tweetId={id}
          textContent={content}
          sessionUser={sessionUser}
          setIsEditTweetModalOpen={setIsEditTweetModalOpen}
        />
      )}

      {isDeleteTweetModalOpen && (
        <DeleteTweetModal
          tweetId={id}
          sessionUsername={sessionUser.username}
          setIsDeleteTweetModalOpen={setIsDeleteTweetModalOpen}
        />
      )}
    </>
  );
};

export default TweetCard;
