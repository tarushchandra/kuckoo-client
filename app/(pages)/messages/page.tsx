"use client";
import React, { useState } from "react";
import { useChats } from "@/hooks/queries/chat";
import Header from "@/components/header";
import ChatCard from "@/components/chat-card";
import { Chat as ChatType } from "@/gql/graphql";
import { Mails, MessageSquarePlus, MessagesSquare, Users } from "lucide-react";
import Chat from "@/components/chat";
import UserCardLoading from "@/components/ui/user-card-loading";
import NewChatModal from "@/components/new-chat-modal";

interface MessagesPageProps {}

export default function MessagesPage() {
  const chats = useChats();
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  console.log("chats -", chats);

  return (
    <>
      <div className="col-span-5 border-l border-zinc-800 overflow-y-hidden">
        <Header className="p-4 text-xl font-semibold flex justify-between items-center">
          <h1>Chats</h1>
          <div className="flex gap-4">
            <div title="New Chat" onClick={() => setIsNewChatModalOpen(true)}>
              <MessagesSquare size={25} className="cursor-pointer" />
            </div>
            <div title="New Group">
              <Users size={25} className="cursor-pointer " />
            </div>
          </div>
        </Header>
        <>
          {chats ? (
            <div className="h-full overflow-y-auto">
              {chats.map((chat: any) => (
                <div key={chat.id} onClick={() => setSelectedChat(chat)}>
                  <ChatCard chat={chat} selectedChat={selectedChat!} />
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

      <div className="col-span-12 flex flex-col overflow-y-hidden border-x border-zinc-800 ">
        {selectedChat ? (
          <Chat chat={selectedChat} setSelectedChat={setSelectedChat} />
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
      </div>

      <>
        {isNewChatModalOpen && (
          <NewChatModal
            onClose={() => setIsNewChatModalOpen(false)}
            setSelectedChat={setSelectedChat}
          />
        )}
      </>
    </>
  );
}
