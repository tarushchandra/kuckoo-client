"use client";
import { Info, SendHorizontal } from "lucide-react";
import Header from "./header";
import Image from "next/image";
import ChatMessages from "./chat-messages";
import { Chat as ChatType } from "@/gql/graphql";
import { useEffect, useLayoutEffect, useState } from "react";
import mergeClasses from "@/utils/mergeClasses";
import { useSendMessage } from "@/hooks/mutations/chat";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import ChatInfo from "./chat-info";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";

interface ChatProps {
  chat: ChatType;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatType | null>>;
}

export default function Chat({ chat, setSelectedChat }: ChatProps) {
  const { data: sessionUser } = useAuth(selectUser);
  const [message, setMessage] = useState("");
  const [isChatInfoTabOpen, setIsChatInfoTabOpen] = useState(false);

  const sendMessageMutation = useSendMessage({
    onSuccess: () => setMessage(""),
    onError: () => setMessage(message),
    setSelectedChat: setSelectedChat,
  });

  // console.log("chat -", chat);

  // console.log("members- ", chat.members);
  // console.log("chat rendered");
  // console.log("chat component re-rendered, message -", message);

  useEffect(() => {
    isChatInfoTabOpen && setIsChatInfoTabOpen(false);
  }, [chat.id]);

  //   useEffect(() => {
  //     return () => {
  //       setMessage("");
  //     };
  //   }, [chat.id]);

  const handleSendMessage = async () => {
    if (sendMessageMutation.isPending || !message) return;

    await sendMessageMutation.mutateAsync({
      payload: {
        chatId: chat.id ?? null,
        content: message,
        targetUserIds: [chat.members![0]?.id!],
      },
      message: {
        id: chat.id ?? "default-message-id",
        content: message,
        createdAt: String(Date.now()),
        sender: {
          id: sessionUser?.id!,
          username: sessionUser?.username!,
          profileImageURL: sessionUser?.profileImageURL!,
        } as any,
      },
      selectedChat: {
        ...chat,
        latestMessage: {
          content: message,
          createdAt: String(Date.now()),
          sender: {
            firstName: sessionUser?.firstName!,
            username: sessionUser?.username!,
            profileImageURL: sessionUser?.profileImageURL!,
          } as any,
        },
      },
    });
    setMessage("");
  };

  return (
    <>
      <Header className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center ">
            <div className="cursor-pointer">
              {chat?.isGroupChat ? (
                <div className="relative w-[40px] h-[40px]">
                  <Image
                    title={
                      chat.members![0]?.firstName +
                      " " +
                      chat.members![0]?.lastName
                    }
                    src={chat.members![0]?.profileImageURL!}
                    alt="chat-user-image"
                    width={30}
                    height={30}
                    className="rounded-full absolute top-0 left-0"
                  />
                  <Image
                    title={
                      chat.members![1]?.firstName +
                      " " +
                      chat.members![1]?.lastName
                    }
                    src={chat.members![1]?.profileImageURL!}
                    alt="chat-user-image"
                    width={30}
                    height={30}
                    className="rounded-full absolute bottom-0 left-[50%] -translate-x-1/2 border border-zinc-500"
                  />
                  {chat.totalMembersCount! > 3 && (
                    <div className="border border-zinc-500 flex justify-center items-center text-xs font-bold w-[30px] h-[30px] rounded-full absolute top-0 right-0 bg-white text-black opacity-80">
                      +{chat.totalMembersCount! - 3}
                    </div>
                  )}
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
            <div className="cursor-pointer">
              {chat.isGroupChat ? (
                <h2 className="font-semibold">{chat.name}</h2>
              ) : (
                <>
                  <h2 className="font-semibold">
                    {chat.members![0]?.firstName} {chat.members![0]?.lastName}
                  </h2>
                  <h2 className="text-zinc-500 text-sm font-medium">
                    @{chat.members![0]?.username}
                  </h2>
                </>
              )}
            </div>
          </div>

          <>
            {chat.id && (
              <>
                {isChatInfoTabOpen ? (
                  <AiFillInfoCircle
                    onClick={() => setIsChatInfoTabOpen(false)}
                    className="w-6 h-6 cursor-pointer"
                  />
                ) : (
                  <AiOutlineInfoCircle
                    onClick={() => setIsChatInfoTabOpen(true)}
                    className="w-6 h-6 cursor-pointer"
                  />
                )}
              </>
            )}
          </>
        </div>
      </Header>

      <div className="flex relative h-full overflow-y-auto">
        <div
          onClick={() => isChatInfoTabOpen && setIsChatInfoTabOpen(false)}
          className={mergeClasses(
            "flex-1 flex flex-col",
            isChatInfoTabOpen && "bg-black opacity-20"
          )}
        >
          <ChatMessages chat={chat} />

          <div className="sticky bottom-0 flex p-4 border-t border-zinc-800 bg-gradient-to-t from-black to-transparent backdrop-blur-md">
            <input
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              value={message}
              type="text"
              placeholder="Type your message..."
              className="w-full rounded-s-full text-sm bg-zinc-950 px-4 py-2 border border-zinc-800 focus:outline-none"
            />
            <button
              disabled={!message}
              className={mergeClasses(
                "bg-zinc-900 flex justify-center items-center px-6 border border-zinc-800 rounded-e-full transition-all text-zinc-400 hover:bg-zinc-950 hover:text-white",
                !message &&
                  "text-zinc-700 cursor-not-allowed hover:text-zinc-700 hover:bg-zinc-900"
              )}
              onClick={handleSendMessage}
            >
              <SendHorizontal size={20} />
            </button>
          </div>
        </div>

        {isChatInfoTabOpen && <ChatInfo chat={chat} />}
      </div>
    </>
  );
}
