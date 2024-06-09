import { Chat } from "@/gql/graphql";
import { useChatMessages } from "@/hooks/queries/chat";
import ChatMessage from "./chat-message";
import { getModifiedDate, getModifiedDateInNumbers } from "@/utils/date";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";

interface ChatMessagesProps {
  chat: Chat;
}

export default function ChatMessages(props: ChatMessagesProps) {
  const { chat } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const allGroupedMessages = useChatMessages(chat?.id!);
  const chatCreatedAtDate = getModifiedDateInNumbers(chat.createdAt!);

  return (
    <div className="h-full overflow-y-auto flex flex-col-reverse gap-3 p-4 ">
      {allGroupedMessages ? (
        <>
          <div className="flex flex-col-reverse gap-3">
            {allGroupedMessages.map((groupedMessages) => {
              const modifiedDate = getModifiedDate(
                groupedMessages?.messages[0]?.createdAt!
              );

              return (
                <>
                  <div className="flex flex-col-reverse gap-4">
                    {groupedMessages?.messages.map((message: any) => (
                      <ChatMessage message={message} />
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-200 text-black  ">
                      {modifiedDate}
                    </h2>
                  </div>
                </>
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
