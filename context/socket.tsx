"use client";
import AppLoading from "@/components/ui/app-loading";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import {
  addMessage,
  addTypingUser,
  removeTypingUser,
  setMessageIsSentToRecipient,
  setUnseenMessagesAsSeen,
} from "@/lib/redux/features/chat/chatSlice";
import { setOnlineStatus } from "@/lib/redux/features/onlineUsers/onlineUsersSlice";
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";

interface SocketContextProps {
  socket: WebSocket | null;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });
export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state)
    throw new Error(
      "SocketContext is null, Please make sure you are using useSocket wrapped inside SocketProvider."
    );
  return state;
};

interface Timeouts {
  [chatId: string]: {
    [userId: string]: NodeJS.Timeout | undefined;
  };
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { data: sessionUser, getAccessToken } = useAuth(selectUser);
  const dispatch = useDispatch();
  //   console.log("socket -", socket);

  const timeoutsRef = useRef<Timeouts>({});
  // const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("connected to socket server");
      setSocket(socket);

      socket.send(
        JSON.stringify({ type: "AUTH", accessToken: getAccessToken() })
      );
    };

    socket.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      // console.log("message -", parsedMessage);

      if (
        parsedMessage.type === "USER_IS_ONLINE" ||
        parsedMessage.type === "USER_IS_OFFLINE"
      )
        dispatch(setOnlineStatus(parsedMessage));

      if (parsedMessage.type === "CHAT_MESSAGE") {
        dispatch(addMessage({ messagePayload: parsedMessage, sessionUser }));

        const {
          chatId,
          message: { sender },
        } = parsedMessage;

        const timeout = timeoutsRef.current?.[chatId]?.[sender.id];
        if (timeout) {
          clearTimeout(timeout);
          dispatch(removeTypingUser({ chatId }));

          delete timeoutsRef.current[chatId][sender.id];
          if (Object.keys(timeoutsRef.current[chatId]).length === 0)
            delete timeoutsRef.current[chatId];
        }
      }

      if (parsedMessage.type === "USER_IS_TYPING") {
        const { chatId, user } = parsedMessage;

        const timeout = timeoutsRef.current?.[chatId]?.[user.id];
        if (timeout) clearTimeout(timeout);
        else dispatch(addTypingUser(parsedMessage));

        if (!timeoutsRef.current[chatId]) timeoutsRef.current[chatId] = {};

        timeoutsRef.current[chatId][user.id] = setTimeout(() => {
          dispatch(removeTypingUser(parsedMessage));

          delete timeoutsRef.current[chatId][user.id];
          if (Object.keys(timeoutsRef.current[chatId]).length === 0)
            delete timeoutsRef.current[chatId];
        }, 3000);
      }

      if (parsedMessage.type === "CHAT_MESSAGE_IS_SENT_TO_THE_RECIPIENT")
        dispatch(setMessageIsSentToRecipient(parsedMessage));

      if (parsedMessage.type === "CHAT_MESSAGES_ARE_SEEN_BY_THE_RECIPIENT")
        dispatch(
          setUnseenMessagesAsSeen({
            actionType: "SETTING_THE_UNSEEN_MESSAGES_AS_SEEN_FOR_SENDER",
            payload: parsedMessage,
          })
        );
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) return <AppLoading />;

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// if (timeoutRef.current) {
//   clearTimeout(timeoutRef.current);
//   console.log("cleared timeout");
// } else dispatch(addTypingUser(parsedMessage));

// timeoutRef.current = setTimeout(() => {
//   console.log("setTimeout CB called");
//   dispatch(removeTypingUser(parsedMessage));
//   timeoutRef.current = null;
// }, 3000);
