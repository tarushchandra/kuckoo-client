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
  const groupedMessages = useChatMessages(chat?.id!);

  return (
    <div className="h-full overflow-y-auto flex flex-col-reverse gap-3 p-4 ">
      <div className="flex flex-col-reverse gap-3">
        {groupedMessages?.map((groupedMessage) => {
          const modifiedDate = getModifiedDate(
            groupedMessage?.messages[0]?.createdAt!
          );

          return (
            <>
              <div className="flex flex-col-reverse gap-4">
                {groupedMessage?.messages.map((message: any) => (
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
          {chat.isGroupChat ? (
            <>
              <>
                {sessionUser?.username === chat.creator?.username
                  ? "You"
                  : chat.creator?.firstName}
              </>
              <span>
                {" "}
                created the group on {getModifiedDateInNumbers(chat.createdAt!)}
              </span>
            </>
          ) : (
            <>
              <>
                {sessionUser?.username === chat.creator?.username
                  ? "You"
                  : chat.creator?.firstName}
              </>
              <span>
                {" "}
                started the conversation on{" "}
                {getModifiedDateInNumbers(chat.createdAt!)}
              </span>
            </>
          )}
        </h2>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="h-full overflow-y-auto flex flex-col-reverse gap-3 p-4 ">
  //       {groupedMessages?.map((groupedMessage) => {
  //         const modifiedDate = getModifiedDate(
  //           groupedMessage?.messages[0]?.createdAt!
  //         );

  //         return (
  //           <>
  //             <div className="flex flex-col-reverse gap-4">
  //               {groupedMessage?.messages.map((message: any) => (
  //                 <ChatMessage message={message} />
  //               ))}
  //             </div>
  //             <div className="flex justify-center">
  //               <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-200 text-black  ">
  //                 {modifiedDate}
  //               </h2>
  //             </div>
  //           </>
  //         );
  //       })}
  //     </div>
  //   </>
  // );
}
