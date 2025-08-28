import { User } from "@/gql/graphql";
import {
  addMessage,
  addTypingUser,
  removeTypingUser,
  replaceTemporaryChatOrMessagesIdWithActualIds,
  setMessageIsRecivedByTheServer,
  setUnseenMessagesAsSeen,
} from "@/lib/redux/features/chat/chatSlice";
import {
  addOnlineUser,
  setOnlineStatus,
} from "@/lib/redux/features/onlineUsers/onlineUsersSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

// Constants
const TYPING_TIMEOUT_DURATION = 3000;

export interface IMessageEvent {
  message: any;
  sessionUser: User | null;
  path: string;
  dispatch: Dispatch<UnknownAction>;
  userTypingTimeoutsRef: React.MutableRefObject<Timeouts>;
}

export interface Timeouts {
  [chatId: string]: {
    [userId: string]: NodeJS.Timeout | undefined;
  };
}

export const handleSocketMessage = (messageEvent: IMessageEvent) => {
  const { message, sessionUser, path, dispatch, userTypingTimeoutsRef } =
    messageEvent;

  if (message.type === "USER_IS_ONLINE" || message.type === "USER_IS_OFFLINE")
    dispatch(setOnlineStatus(message));

  if (message.type === "IS_USER_ONLINE") dispatch(addOnlineUser(message));

  if (message.type === "CHAT_MESSAGE") {
    dispatch(
      addMessage({
        messagePayload: message,
        sessionUser,
        isMessagesPathSelected: path.includes("messages") ? true : false,
      })
    );

    const {
      chatId,
      message: { sender },
    } = message;

    const timeout = userTypingTimeoutsRef.current?.[chatId]?.[sender.id];
    if (timeout) {
      clearTimeout(timeout);

      dispatch(removeTypingUser({ chatId }));
      delete userTypingTimeoutsRef.current[chatId][sender.id];
      if (Object.keys(userTypingTimeoutsRef.current[chatId]).length === 0)
        delete userTypingTimeoutsRef.current[chatId];
    }
  }

  if (message.type === "USER_IS_TYPING") {
    const { chatId, user } = message;

    const timeout = userTypingTimeoutsRef.current?.[chatId]?.[user.id];
    if (timeout) clearTimeout(timeout);
    else dispatch(addTypingUser(message));

    if (!userTypingTimeoutsRef.current[chatId])
      userTypingTimeoutsRef.current[chatId] = {};

    userTypingTimeoutsRef.current[chatId][user.id] = setTimeout(() => {
      dispatch(removeTypingUser({ chatId }));
      delete userTypingTimeoutsRef.current[chatId][user.id];
      if (Object.keys(userTypingTimeoutsRef.current[chatId]).length === 0)
        delete userTypingTimeoutsRef.current[chatId];
    }, TYPING_TIMEOUT_DURATION);
  }

  if (message.type === "CHAT_MESSAGE_IS_RECIEVED_BY_THE_SERVER")
    dispatch(setMessageIsRecivedByTheServer(message));

  if (message.type === "CHAT_MESSAGES_ARE_SEEN_BY_THE_RECIPIENT")
    dispatch(
      setUnseenMessagesAsSeen({
        actionType: "SETTING_THE_UNSEEN_MESSAGES_AS_SEEN_FOR_SENDER",
        payload: message,
      })
    );

  if (message.type === "ACTUAL_CHAT_OR_MESSAGES_IDS")
    dispatch(
      replaceTemporaryChatOrMessagesIdWithActualIds({
        ...message,
        sessionUser,
      })
    );
};
