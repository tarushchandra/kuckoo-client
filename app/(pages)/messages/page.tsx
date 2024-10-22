"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import ChatCard from "@/components/chat-card";
import { Chat as ChatType } from "@/gql/graphql";
import { Mails, MessageSquarePlus, MessagesSquare, Users } from "lucide-react";
import Chat from "@/components/chat";
import UserCardLoading from "@/components/ui/user-card-loading";
import NewChatModal from "@/components/new-chat-modal";
import NewGroupModal from "@/components/new-group-modal";
import { queryClient } from "@/lib/clients/query";
import { graphqlClient } from "@/lib/clients/graphql";
import { getChatsQuery } from "@/graphql/queries/chat";
import { useDispatch } from "react-redux";
import { addChats, selectChat } from "@/lib/redux/features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useChats } from "@/hooks/services/chat";
import mergeClasses from "@/utils/mergeClasses";

interface MessagesPageProps {}

export default function MessagesPage() {
  const chats = useChats();
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector((store) => store.chat.selectedChat);

  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  console.log("chats -", chats);

  return (
    <>
      <div
        className={mergeClasses(
          "sm:col-span-8 sm:border-zinc-800 sm:border-l sm:border-r md:col-span-9 lg:col-span-5 xl:col-span-6 overflow-y-hidden",
          selectedChat && "hidden lg:block"
        )}
      >
        <Header className="p-4 text-xl font-semibold flex justify-between items-center">
          <h1>Chats</h1>
          <div className="flex gap-4">
            <div title="New Chat" onClick={() => setIsNewChatModalOpen(true)}>
              <MessagesSquare size={25} className="cursor-pointer" />
            </div>
            <div title="New Group" onClick={() => setIsNewGroupModalOpen(true)}>
              <Users size={25} className="cursor-pointer " />
            </div>
          </div>
        </Header>
        <>
          {chats.length > 0 ? (
            <div className="h-full overflow-y-auto">
              {chats.map((chat: any) => (
                <div key={chat.id} onClick={() => dispatch(selectChat(chat))}>
                  <ChatCard chat={chat} />
                </div>
              ))}
            </div>
          ) : (
            Array.from({ length: 15 }, (_, index) => (
              <div key={index} className="border-b border-zinc-800">
                <UserCardLoading
                  className="px-4 py-2"
                  skeletonClassName="bg-zinc-900"
                  nameClassName="w-32"
                  userNameClassName="w-24"
                />
              </div>
            ))
          )}
        </>
      </div>

      {/* <div
        className={mergeClasses(
          "hidden col-span-12 lg:flex flex-col overflow-y-hidden border-x border-zinc-800",
          selectedChat && "flex"
        )}
      >
        {selectedChat ? (
          <Chat key={selectedChat.id} />
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center h-full">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex justify-center items-center border-4 border-zinc-300 p-5 rounded-full">
                <Mails size={100} strokeWidth={4} absoluteStrokeWidth={true} />
              </div>
              <h1 className="text-zinc-400">Send a message to start a chat.</h1>
            </div>
            <button className="bg-[#1D9BF0] text-white text-sm transition-all font-semibold px-4 py-2 rounded-full hover:bg-[#1993e6] ">
              Send Message
            </button>
          </div>
        )}
      </div> */}

      <div className="sm:col-span-8 md:col-span-9 lg:col-span-8 xl:col-span-12 overflow-y-auto">
        {selectedChat ? (
          <div className="h-full flex flex-col border-x border-zinc-800">
            <Chat key={selectedChat.id} />
          </div>
        ) : (
          <div className="hidden lg:border-r lg:border-zinc-800 lg:flex flex-col gap-2 justify-center items-center h-full">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex justify-center items-center border-4 border-zinc-300 p-5 rounded-full">
                <Mails size={100} strokeWidth={4} absoluteStrokeWidth={true} />
              </div>
              <h1 className="text-zinc-400">Send a message to start a chat.</h1>
            </div>
            <button className="bg-[#1D9BF0] text-white text-sm transition-all font-semibold px-4 py-2 rounded-full hover:bg-[#1993e6] ">
              Send Message
            </button>
          </div>
        )}
      </div>

      {/* <>
        {isNewChatModalOpen && (
          <NewChatModal
            onClose={() => setIsNewChatModalOpen(false)}
            setSelectedChat={setSelectedChat}
          />
        )}

        {isNewGroupModalOpen && (
          <NewGroupModal onClose={() => setIsNewGroupModalOpen(false)} />
        )}
      </> */}
    </>
  );
}
