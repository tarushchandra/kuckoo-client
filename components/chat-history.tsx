import { Chat, ChatActivityType } from "@/gql/graphql";
import { useChatHistory } from "@/hooks/queries/chat";
import ChatMessage from "./chat-message";
import { getModifiedDate, getModifiedDateInNumbers } from "@/utils/date";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { useState } from "react";
import { User } from "lucide-react";
import ChatActivity from "./chat-activity";

interface ChatMessagesProps {
  chat: Chat;
}

export default function ChatHistory(props: ChatMessagesProps) {
  const { chat } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const chatHistory = useChatHistory(chat);
  const chatCreatedAtDate = getModifiedDateInNumbers(chat.createdAt!);

  // console.log("ChatMessages component, chat -", chat);
  console.log("chatHistory -", chatHistory);

  if (!chat.id) return <div className="h-full" />;

  return (
    <div className="h-full overflow-y-auto flex flex-col-reverse gap-3 p-4 ">
      {chatHistory ? (
        <>
          <div className="flex flex-col-reverse gap-3">
            {chatHistory.map((chatHistoryItem) => {
              return (
                <div
                  key={chatHistoryItem?.date}
                  className="flex flex-col-reverse gap-3"
                >
                  <div className="flex flex-col-reverse gap-4">
                    {chatHistoryItem?.messages!.map((message: any) => (
                      <ChatMessage message={message} chat={chat} />
                    ))}
                  </div>
                  <div className="flex flex-col-reverse gap-4">
                    {chatHistoryItem?.activities!.map((activity: any) => (
                      <ChatActivity activity={activity} />
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-200 text-black  ">
                      {chatHistoryItem?.date}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-200 text-black  ">
              <>
                {sessionUser?.username === chat.creator?.username
                  ? "You"
                  : chat.creator?.firstName}
              </>
              {chat.isGroupChat ? (
                <span> created the group on {chatCreatedAtDate}</span>
              ) : (
                <span> started the conversation on {chatCreatedAtDate}</span>
              )}
            </h2>
          </div>
        </>
      ) : (
        <h1 className="text-center text-sm text-zinc-500 animate-pulse">
          Loading...
        </h1>
      )}
    </div>
  );
}
