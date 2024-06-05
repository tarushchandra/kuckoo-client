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
  }, [chat.id]);

  const modifiedDate = getModifiedDateForChatCard(latestMessage?.createdAt!);

  return (
    <div
      className={mergeClasses(
        "flex px-4 py-3 gap-2 cursor-pointer border-b transition-all border-zinc-800 hover:bg-zinc-950",
        selectedChat &&
          selectedChat.id === chat.id &&
          "bg-zinc-900 hover:bg-zinc-900"
      )}
    >
      <div>
        <Image
          src={chat.members![0]?.profileImageURL!}
          alt="chat-user-image"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="w-full">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="font-semibold text-sm">
            {chatMember?.firstName} {chatMember?.lastName}
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
