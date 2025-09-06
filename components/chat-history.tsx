import { memo } from "react";
import { Chat, Message } from "@/gql/graphql";
import { getModifiedDateInNumbers } from "@/utils/date";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { useEffect, useRef } from "react";
import { useSetMessagesAsSeen } from "@/hooks/mutations/chat";
import ChatHistoryItem from "./chat-history-item";
import { queryClient } from "@/lib/clients/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useChatHistory } from "@/hooks/services/chat";
import {
  setChatAsSeen,
  setUnseenMessagesAsSeen,
} from "@/lib/redux/features/chat/chatSlice";
import { useSocket } from "@/context/socket";

function ChatHistory() {
  const selectedChat = useAppSelector((store) => store.chat.selectedChat);
  const { data: sessionUser } = useAuth(selectUser);
  const chatHistoryObj = useChatHistory(selectedChat!.id);
  const isIncomingMessageChatSelected = useAppSelector(
    (store) => store.chat.isIncomingMessageChatSelected
  );
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  const chatHistory = chatHistoryObj?.data;
  const chatCreatedAtDate = getModifiedDateInNumbers(selectedChat!.createdAt!);

  // ----------------------------------------------------------------------------------------

  useEffect(() => {
    if (selectedChat!.unseenMessagesCount === 0) return;
    if (!chatHistory || chatHistory.length === 0) return;

    dispatch(setChatAsSeen());

    const totalUnseenMessages = chatHistory.reduce(
      (acc: Message[], chatHistoryItem) => {
        const unseenMessages = chatHistoryItem.messages?.unseenMessages;
        if (unseenMessages?.length === 0) return acc;
        acc.push(...(unseenMessages as Message[]));
        return acc;
      },
      []
    );

    socket?.send(
      JSON.stringify({
        type: "CHAT_MESSAGES_ARE_SEEN_BY_THE_RECIPIENT",
        chatId: selectedChat?.id,
        messages: totalUnseenMessages,
        seenBy: {
          id: sessionUser?.id,
        },
      })
    );

    if (isIncomingMessageChatSelected)
      dispatch(
        setUnseenMessagesAsSeen({
          actionType: "SETTING_THE_UNSEEN_MESSAGES_AS_SEEN_FOR_RECIPIENT",
          payload: {
            chatId: selectedChat?.id,
          },
        })
      );
  }, [
    dispatch,
    chatHistory,
    isIncomingMessageChatSelected,
    selectedChat,
    sessionUser?.id,
    socket,
  ]);

  useEffect(() => {
    return () => {
      if (selectedChat!.unseenMessagesCount === 0) return;
      dispatch(
        setUnseenMessagesAsSeen({
          actionType: "SETTING_THE_UNSEEN_MESSAGES_AS_SEEN_FOR_RECIPIENT",
          payload: {
            chatId: selectedChat?.id,
          },
        })
      );
    };
  }, [dispatch, selectedChat]);

  return (
    <div className="h-full overflow-y-auto flex flex-col-reverse gap-2 p-4 ">
      {chatHistoryObj ? (
        <>
          <div className="flex flex-col-reverse gap-3">
            {chatHistory.map((chatHistoryItem) => (
              <ChatHistoryItem
                key={chatHistoryItem?.date}
                chatHistoryItem={chatHistoryItem as any}
              />
            ))}
          </div>

          {chatHistoryObj.isDataLoading && (
            <h1 className="text-center text-sm text-zinc-500 animate-pulse">
              Loading...
            </h1>
          )}

          {(chatHistoryObj.isDataFetched ||
            (chatHistoryObj.isNewChat && chatHistory.length > 0)) && (
            <div className="flex justify-center">
              <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-200 text-black  ">
                <>
                  {sessionUser?.username === selectedChat!.creator?.username
                    ? "You"
                    : selectedChat!.creator?.firstName}
                </>
                {selectedChat!.isGroupChat ? (
                  <span> created the group on {chatCreatedAtDate}</span>
                ) : (
                  <span> started the conversation on {chatCreatedAtDate}</span>
                )}
              </h2>
            </div>
          )}
        </>
      ) : (
        <h1 className="text-center text-sm text-zinc-500 animate-pulse">
          Loading...
        </h1>
      )}
    </div>
  );
}

export default memo(ChatHistory);
