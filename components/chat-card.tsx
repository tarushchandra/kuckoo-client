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

interface ChatCardProps {
  chat: Chat;
  selectedChat: Chat;
}

export default function ChatCard(props: ChatCardProps) {
  const { chat, selectedChat } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const { isGroupChat, latestMessage, members, name } = chat;

  let chatMember = null;
  if (!isGroupChat) chatMember = members![0];

  const modifiedContent = useMemo(() => {
    return latestMessage?.content?.length! > 23
      ? latestMessage?.content?.slice(0, 23) + "..."
      : latestMessage?.content;
  }, [chat.latestMessage?.content]);

  const modifiedDate = getModifiedDateForChatCard(latestMessage?.createdAt!);

  return (
    <div
      className={mergeClasses(
        "flex items-center px-4 py-3 gap-2 cursor-pointer border-b transition-all border-zinc-800 hover:bg-zinc-950",
        selectedChat &&
          selectedChat.id === chat.id &&
          "bg-zinc-900 hover:bg-zinc-900"
      )}
    >
      <div>
        {isGroupChat ? (
          <div className="relative w-[40px] h-[40px]">
            <Image
              src={chat.members![0]?.profileImageURL!}
              alt="chat-user-image"
              width={30}
              height={30}
              className="rounded-full absolute top-0 left-0"
            />
            <Image
              src={chat.members![1]?.profileImageURL!}
              alt="chat-user-image"
              width={30}
              height={30}
              className="rounded-full absolute bottom-0 right-0"
            />
          </div>
        ) : (
          <Image
            src={chat.members![0]?.profileImageURL!}
            alt="chat-user-image"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="font-semibold text-sm">
            {isGroupChat
              ? name
              : chatMember?.firstName + " " + chatMember?.lastName}
          </h2>
          <h2 className="text-xs font-medium text-zinc-500">{modifiedDate}</h2>
        </div>
        <div className="text-sm text-zinc-400 flex gap-2">
          <h3>
            {latestMessage?.sender?.username === sessionUser?.username
              ? "You"
              : latestMessage?.sender?.firstName}
            :
          </h3>
          <h3 title={latestMessage?.content!}>{modifiedContent}</h3>
        </div>
      </div>
    </div>
  );
}
