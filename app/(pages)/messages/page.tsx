"use client";
import React, { useState } from "react";
import { useChats } from "@/hooks/queries/chat";
import Header from "@/components/header";
import ChatCard from "@/components/chat-card";
import Image from "next/image";
import { Chat } from "@/gql/graphql";
import { Mails, SendHorizontal } from "lucide-react";
import ChatMessages from "@/components/chat-messages";

interface MessagesPageProps {}

export default function MessagesPage() {
  const chats = useChats();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <>
      <div className="col-span-5 border-l border-zinc-800 overflow-y-hidden">
        <Header className="p-4 text-xl font-semibold">Chats</Header>
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
            <h1 className="py-2 text-center text-zinc-500 animate-pulse">
              Loading...
            </h1>
          )}
        </>
      </div>

      <div className="col-span-12 flex flex-col overflow-y-hidden border-x border-zinc-800 ">
        {selectedChat ? (
          <>
            <Header className="px-4 py-3">
              <div className="flex gap-2 items-center">
                <div>
                  <Image
                    src={selectedChat.members![0]?.profileImageURL!}
                    alt="chat-user-image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">
                    {selectedChat.members![0]?.firstName}{" "}
                    {selectedChat.members![0]?.lastName}
                  </h2>
                  <h2 className="text-zinc-500 text-sm font-medium">
                    @{selectedChat.members![0]?.username}
                  </h2>
                </div>
              </div>
            </Header>
            <ChatMessages chat={selectedChat} />

            {/* input field */}
            <div className="sticky bottom-0 flex p-4 border-t border-zinc-800 bg-gradient-to-t from-black to-transparent backdrop-blur-md">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full rounded-s-full text-sm bg-black px-4 py-2 border border-zinc-800 focus:outline-none"
              />
              <button className="bg-zinc-900 px-6 border-l-0 border border-zinc-800 rounded-e-full transition text-zinc-400 hover:bg-zinc-950 hover:text-white ">
                <SendHorizontal size={22} className="" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center h-full">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex justify-center items-center border-4 border-zinc-300 p-5 rounded-full">
                {/* <MessagesSquare size={100} strokeWidth={4} absoluteStrokeWidth={true}  /> */}
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
    </>
  );
}
