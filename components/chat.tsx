"use client";
import { ArrowLeft, Info, SendHorizontal } from "lucide-react";
import Header from "./header";
import Image from "next/image";
import ChatMessages from "./chat-history";
import { Chat as ChatType } from "@/gql/graphql";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import mergeClasses from "@/utils/mergeClasses";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import ChatInfo from "./chat-info";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import ChatHistory from "./chat-history";
import { useSocket } from "@/context/socket";
import { useSelector } from "react-redux";
import { queryClient } from "@/lib/clients/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addMessage,
  removeSelectedChat,
} from "@/lib/redux/features/chat/chatSlice";
import { getModifiedLastSeenDateForChat } from "@/utils/date";
import { useOnlineUser, useUserLastSeenAt } from "@/hooks/services/chat";
import { useThrottle } from "@/hooks/utils";

// const useThrottle = (func: () => void, delay: number) => {
//   let isTimeoutPresent = false;

//   return () => {
//     if (isTimeoutPresent) return;

//     func();
//     console.log("func called");

//     setTimeout(() => {
//       console.log("setTimeout cb called");

//       isTimeoutPresent = false;
//     }, delay);
//     isTimeoutPresent = true;
//   };
// };

// const useThrottle = () => {
// return useCallback((func: () => void, delay: number) => {
//   let isTimeoutPresent = false;

//   return () => {
//     if (isTimeoutPresent) return;

//     func();
//     setTimeout(() => {
//       isTimeoutPresent = false;
//     }, delay);
//     isTimeoutPresent = true;
//   };
// }, []);
// };

export default function Chat() {
  const { data: sessionUser } = useAuth(selectUser);
  const selectedChat = useAppSelector((store) => store.chat.selectedChat);
  const onlineUser = useOnlineUser(selectedChat!.members![0]?.id!);
  const isUserTyping = useAppSelector(
    (store) => store.chat.typingUsers[selectedChat?.id!]
  );
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  console.log("onlineUser -", onlineUser);

  const [message, setMessage] = useState("");
  const [isChatInfoTabOpen, setIsChatInfoTabOpen] = useState(false);

  const lastSeenAt =
    onlineUser?.isOnline === false
      ? getModifiedLastSeenDateForChat(onlineUser?.lastSeenAt!)
      : "";

  const throttledSendTypingEvent = useThrottle(
    () =>
      socket?.send(
        JSON.stringify({
          type: "USER_IS_TYPING",
          chatId: selectedChat?.id,
          user: {
            id: sessionUser?.id,
            firstName: sessionUser?.firstName,
          },
        })
      ),
    2800
  );

  useEffect(() => {
    isChatInfoTabOpen && setIsChatInfoTabOpen(false);
  }, [selectedChat?.id, isChatInfoTabOpen]);

  const handleSendMessage = async () => {
    const messagePayload = {
      type: "CHAT_MESSAGE",
      chatId: selectedChat?.id,
      message: {
        id: Math.random(),
        content: message,
        sender: {
          id: sessionUser?.id!,
          username: sessionUser?.username!,
          firstName: sessionUser?.firstName!,
          profileImageURL: sessionUser?.profileImageURL!,
        },
        createdAt: String(Date.now()),
      },
      ...(typeof selectedChat?.id === "number" && {
        targetUsers: selectedChat.members,
        creator: sessionUser,
      }),
    };

    socket?.send(JSON.stringify(messagePayload));
    dispatch(addMessage({ messagePayload, sessionUser }));
    setMessage("");
  };

  return (
    <>
      <Header className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <ArrowLeft
              className="xs:max-lg:block hidden"
              onClick={() => dispatch(removeSelectedChat())}
            />
            <div className="flex gap-2 items-center ">
              <div className="cursor-pointer">
                {selectedChat?.isGroupChat ? (
                  <div className="relative w-[40px] h-[40px]">
                    <Image
                      title={
                        selectedChat.members![0]?.firstName +
                        " " +
                        selectedChat.members![0]?.lastName
                      }
                      src={selectedChat.members![0]?.profileImageURL!}
                      alt="chat-user-image"
                      width={30}
                      height={30}
                      className="rounded-full absolute top-0 left-0"
                    />
                    <Image
                      title={
                        selectedChat.members![1]?.firstName +
                        " " +
                        selectedChat.members![1]?.lastName
                      }
                      src={selectedChat.members![1]?.profileImageURL!}
                      alt="chat-user-image"
                      width={30}
                      height={30}
                      className="rounded-full absolute bottom-0 left-[50%] -translate-x-1/2 border border-zinc-500"
                    />
                    {selectedChat.totalMembersCount! > 3 && (
                      <div className="border border-zinc-500 flex justify-center items-center text-xs font-bold w-[30px] h-[30px] rounded-full absolute top-0 right-0 bg-white text-black opacity-80">
                        +{selectedChat.totalMembersCount! - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] relative">
                    <Image
                      src={selectedChat!.members![0]?.profileImageURL!}
                      alt="chat-user-image"
                      width={40}
                      height={40}
                      className="rounded-full object-cover h-full w-full"
                    />{" "}
                    {onlineUser?.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border border-zinc-800 rounded-full"></div>
                    )}
                  </div>
                )}
              </div>

              <div className="transition-all">
                <>
                  {selectedChat?.isGroupChat ? (
                    <h2 className="font-semibold">{selectedChat!.name}</h2>
                  ) : (
                    <h2 className="font-semibold cursor-pointer">
                      {selectedChat!.members![0]?.firstName}{" "}
                      {selectedChat!.members![0]?.lastName}
                    </h2>
                  )}
                </>
                <>
                  {isUserTyping ? (
                    <h2 className="text-zinc-500 text-sm font-medium">
                      {selectedChat?.isGroupChat!
                        ? `${isUserTyping.user.firstName} is typing...`
                        : "typing..."}
                    </h2>
                  ) : (
                    !selectedChat?.isGroupChat && (
                      <h2 className="text-zinc-500 text-sm font-medium">
                        {onlineUser
                          ? onlineUser?.isOnline
                            ? "online"
                            : lastSeenAt
                          : "click here to view profile"}
                      </h2>
                    )
                  )}
                </>
              </div>
            </div>
          </div>

          <>
            {selectedChat!.id && (
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
          <ChatHistory key={selectedChat!.id} />

          <div className="sticky bottom-0 flex p-4 border-t border-zinc-800 bg-gradient-to-t from-black to-transparent backdrop-blur-md">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
                throttledSendTypingEvent();
              }}
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

        {isChatInfoTabOpen && <ChatInfo chat={selectedChat!} />}
      </div>
    </>
  );
}
