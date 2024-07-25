import { Chat } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import mergeClasses from "@/utils/mergeClasses";
import { getModifiedDate, getModifiedDateForChatCard } from "@/utils/date";

dayjs.extend(relativeTime);

// bg-[#1D9BF0]

interface ChatCardProps {
  chat: Chat;
  selectedChat: Chat;
}

export default function ChatCard(props: ChatCardProps) {
  const { chat, selectedChat } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const {
    isGroupChat,
    latestMessage,
    members,
    name,
    totalMembersCount,
    creator,
    createdAt,
  } = chat;

  let chatMember = null;
  if (!isGroupChat) chatMember = members![0];

  const modifiedContent = useMemo(() => {
    return latestMessage?.content?.length! > 23
      ? latestMessage?.content?.slice(0, 23) + "..."
      : latestMessage?.content;
  }, [chat.latestMessage?.content]);

  const modifiedDate = latestMessage
    ? getModifiedDateForChatCard(latestMessage?.createdAt!)
    : getModifiedDateForChatCard(chat.createdAt!);

  return (
    <div
      className={mergeClasses(
        "flex items-center px-4 py-3 gap-2 cursor-pointer border-b transition-all border-zinc-800 hover:bg-zinc-950",
        selectedChat &&
          selectedChat.id === chat.id &&
          "bg-zinc-900 hover:bg-zinc-900"
      )}
    >
      <>
        {isGroupChat ? (
          <div className="relative w-[40px] h-[40px]">
            <Image
              title={
                chat.members![0]?.firstName + " " + chat.members![0]?.lastName
              }
              src={chat.members![0]?.profileImageURL!}
              alt="chat-user-image"
              width={30}
              height={30}
              className="rounded-full absolute top-0 left-0"
            />
            <Image
              title={
                chat.members![1]?.firstName + " " + chat.members![1]?.lastName
              }
              src={chat.members![1]?.profileImageURL!}
              alt="chat-user-image"
              width={30}
              height={30}
              className="rounded-full absolute bottom-0 left-[50%] -translate-x-1/2 border border-zinc-800"
            />
            {totalMembersCount! > 3 && (
              <div className="border border-zinc-800 flex justify-center items-center text-xs font-bold w-[30px] h-[30px] rounded-full absolute top-0 right-0 bg-white text-black opacity-80">
                +{totalMembersCount! - 3}
              </div>
            )}
          </div>
        ) : (
          <div className="w-[40px] h-[40px]">
            <Image
              src={chat.members![0]?.profileImageURL!}
              alt="chat-user-image"
              width={40}
              height={40}
              className="rounded-full object-cover h-full w-full"
            />
          </div>
        )}
      </>
      <div className="flex-1">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="font-bold text-sm text-white">
            {isGroupChat
              ? name
              : chatMember?.firstName + " " + chatMember?.lastName}
          </h2>
          <h2
            className={mergeClasses(
              "text-xs font-medium text-zinc-500",
              chat.unseenMessagesCount! > 0 && "text-[#1D9BF0] font-bold"
            )}
          >
            {modifiedDate}
          </h2>
        </div>
        <div className="text-sm text-zinc-400 flex gap-2">
          {latestMessage ? (
            <div className="flex justify-between items-center w-full">
              <div
                className={mergeClasses(
                  chat.unseenMessagesCount! > 0 && "text-white font-medium"
                )}
              >
                <span>
                  {latestMessage?.sender?.username === sessionUser?.username
                    ? "You"
                    : latestMessage?.sender?.firstName}
                  :
                </span>{" "}
                <span className="" title={latestMessage?.content!}>
                  {modifiedContent}
                </span>
              </div>
              <>
                {chat.unseenMessagesCount! > 0 && (
                  <div className="bg-[#1D9BF0] w-4 h-4 p-[0.6rem] rounded-full text-white text-xs font-bold flex justify-center items-center">
                    {chat.unseenMessagesCount}
                  </div>
                )}
              </>
            </div>
          ) : isGroupChat ? (
            <h3>
              {creator?.username === sessionUser?.username
                ? "You"
                : creator?.firstName}{" "}
              created this group
            </h3>
          ) : (
            <h3>
              {creator?.username === sessionUser?.username
                ? "You"
                : creator?.firstName}{" "}
              started this conversation
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
