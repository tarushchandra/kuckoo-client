"use client";
import { useAuth } from "@/hooks/auth";
import { selectAuth } from "@/lib/redux/features/auth/authSlice";
import { handleSocketMessage, Timeouts } from "@/services/socket";
import { usePathname } from "next/navigation";
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

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { data: auth } = useAuth(selectAuth);
  const { user: sessionUser, isUserAuthenticated } = auth;
  const dispatch = useDispatch();
  const path = usePathname();
  const userTypingTimeoutsRef = useRef<Timeouts>({});

  // Function to create and establish socket connection
  const createSocketConnection = () => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    socket.onopen = () => {
      setSocket(socket);

      socket.send(
        JSON.stringify({
          type: "CONNECTION_ESTABLISHED",
          userId: sessionUser?.id,
        })
      );
    };

    socket.onmessage = (message) => {
      handleSocketMessage({
        message: JSON.parse(message.data),
        sessionUser,
        path,
        dispatch,
        userTypingTimeoutsRef,
      });
    };
  };

  // Function to clear all timeouts when socket disconnects
  const cleanUpUserTypingTimeouts = () => {
    Object.values(userTypingTimeoutsRef.current).forEach((chatTimeout) => {
      Object.values(chatTimeout).forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    });
  };

  // Establishing socket connection when user is authenticated
  useEffect(() => {
    if (isUserAuthenticated) createSocketConnection();

    return () => {
      if (!socket) return;
      socket.close();
      cleanUpUserTypingTimeouts();
    };
  }, [isUserAuthenticated, sessionUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
