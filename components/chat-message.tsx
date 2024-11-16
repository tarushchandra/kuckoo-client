import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import mergeClasses from "@/utils/mergeClasses";
import Image from "next/image";
import dayjs from "dayjs";
import { Chat, Message } from "@/gql/graphql";
import { useState } from "react";
import MessageSeenByModal from "./message-seen-by-modal";
import { useAppSelector } from "@/hooks/redux";

export default function ChatMessage({ message }: { message: Message }) {
  const { data: sessionUser } = useAuth(selectUser);
  const selectedChat = useAppSelector((store) => store.chat.selectedChat);

  // console.log("message -", message);

  const [isMessageSeenByModalOpen, setIsMessageSeenByModalOpen] =
    useState(false);

  const messageCreatedAt = dayjs(Number(message?.createdAt));
  const time = messageCreatedAt.format("h:mm a");

  return (
    <>
      <div
        className={mergeClasses(
          "flex items-center gap-2",
          message?.sender?.username === sessionUser?.username &&
            "flex-row-reverse"
        )}
      >
        <div>
          <Image
            src={message?.sender?.profileImageURL!}
            alt="sender-image"
            width={25}
            height={25}
            className="rounded-full"
          />
        </div>
        <div
          className={mergeClasses(
            "flex flex-col gap-1 w-7/12 items-start",
            message?.sender?.username === sessionUser?.username && "items-end"
          )}
        >
          <div
            className={mergeClasses(
              "bg-zinc-800 text-sm p-2 rounded-lg",
              message?.sender?.username === sessionUser?.username &&
                "bg-[#1D9BF0]"
            )}
          >
            <>
              {selectedChat!.isGroupChat &&
                message.sender?.username !== sessionUser?.username && (
                  <h2 className="text-xs font-semibold text-zinc-500">
                    @{message.sender?.username}
                  </h2>
                )}
            </>
            <h2>{message?.content}</h2>
          </div>

          {/* <div className="flex gap-1 items-center text-xs font-medium text-zinc-500">
            <h2>{time}</h2>
          </div> */}

          {/* <div className="flex gap-1 items-center text-xs font-medium text-zinc-500">
            <h2>{time}</h2>
            {message.seenBy?.length! > 0 && <h2>Seen</h2>}
          </div> */}

          <div className="flex gap-1 items-center text-xs font-medium text-zinc-500">
            {(message.sender?.username !== sessionUser?.username ||
              message.seenBy) && <h2>{time}</h2>}

            {message.sender?.username === sessionUser?.username && (
              <>
                {message.seenBy ? (
                  <>
                    {selectedChat!.isGroupChat ? (
                      <>
                        {message.seenBy.length > 0 && (
                          <>
                            <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                            <h2
                              onClick={() => setIsMessageSeenByModalOpen(true)}
                              className="cursor-pointer hover:underline"
                            >
                              <span>Seen by</span>{" "}
                              <span>
                                {selectedChat!.totalMembersCount! - 1 ===
                                message.seenBy.length ? (
                                  "everyone"
                                ) : (
                                  <>
                                    <span>{message.seenBy.length}</span>{" "}
                                    <span>
                                      {message.seenBy.length === 1
                                        ? "person"
                                        : "people"}
                                    </span>
                                  </>
                                )}
                              </span>
                            </h2>
                          </>
                        )}
                      </>
                    ) : (
                      message.seenBy.length > 0 &&
                      message.seenBy![0]!.id ===
                        selectedChat!.members![0]!.id! && (
                        <>
                          <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                          <h2>Seen</h2>
                        </>
                      )
                    )}
                  </>
                ) : (
                  <h2>Sending...</h2>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isMessageSeenByModalOpen && (
        <MessageSeenByModal
          messageId={message.id!}
          onClose={() => setIsMessageSeenByModalOpen(false)}
        />
      )}
    </>
  );
}
