import { Chat } from "@/gql/graphql";
import { useChatHistory } from "@/hooks/queries/chat";
import { getModifiedDateInNumbers } from "@/utils/date";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { useEffect } from "react";
import { useSetMessagesAsSeen } from "@/hooks/mutations/chat";
import ChatHistoryItem from "./chat-history-item";

interface ChatMessagesProps {
  chat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export default function ChatHistory(props: ChatMessagesProps) {
  const { chat, setSelectedChat } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const chatHistory = useChatHistory(chat);
  const chatCreatedAtDate = getModifiedDateInNumbers(chat.createdAt!);
  const setMessagesAsSeenMutation = useSetMessagesAsSeen();

  console.log("chatHistory -", chatHistory);

  useEffect(() => {
    if (chat.unseenMessagesCount === 0 || !chatHistory) return;

    const setMessagesStatus = async () => {
      const unseenMessageIds: string[] = [];

      chatHistory.forEach((chatHistoryItem) => {
        if (chatHistoryItem?.messages?.unseenMessages?.length === 0) return;

        chatHistoryItem?.messages?.unseenMessages?.forEach((x) =>
          unseenMessageIds.push(x?.id!)
        );
      });

      // console.log("unseenMessageIds -", unseenMessageIds);

      await setMessagesAsSeenMutation.mutateAsync({
        chatId: chat.id,
        messageIds: unseenMessageIds,
      });

      setSelectedChat((prev: any) => ({ ...prev, unseenMessagesCount: 0 }));
    };

    setMessagesStatus();
  }, [chatHistory]);

  if (!chat.id) return <div className="h-full" />;

  return (
    <div className="h-full overflow-y-auto flex flex-col-reverse gap-2 p-4 ">
      {chatHistory ? (
        <>
          <div className="flex flex-col-reverse gap-3">
            {chatHistory.map((chatHistoryItem) => (
              <ChatHistoryItem
                key={chatHistoryItem?.date}
                chatHistoryItem={chatHistoryItem as any}
                chat={chat}
                setSelectedChat={setSelectedChat}
              />
            ))}
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
