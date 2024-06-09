import { Chat, ChatMemberRole } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { useChatMembers } from "@/hooks/queries/chat";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import mergeClasses from "@/utils/mergeClasses";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ChatInfo({ chat }: { chat: Chat }) {
  const { data: sessionUser } = useAuth(selectUser);
  const chatMembers = useChatMembers(chat.id);

  const [isRenameChatNameInputOpen, setIsRenameChatNameInputOpen] =
    useState(false);
  const [chatName, setChatName] = useState(chat.name!);

  if (!chatMembers)
    return (
      <div className="flex justify-center items-center h-full w-1/2">
        <h2 className="text-sm text-zinc-500 animate-pulse">Loading...</h2>
      </div>
    );

  return (
    <div className="bg-black h-full flex flex-col absolute right-0  border-l border-zinc-800 w-1/2">
      <h2 className="text-md py-2 text-center font-semibold bg-black border-b border-zinc-800">
        Chat Info
      </h2>
      <>
        {chat.isGroupChat && (
          <div className="px-4 py-2 flex justify-between items-center border-b border-zinc-800">
            <div className="font-semibold flex gap-2 items-center">
              <h3 className="">Name:</h3>
              <>
                {isRenameChatNameInputOpen ? (
                  <input
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    type="text"
                    className="h-7 rounded-md  bg-zinc-950 p-2 border border-zinc-800 focus:outline-none"
                  />
                ) : (
                  <h3>{chat.name}</h3>
                )}
              </>
            </div>
            <>
              {chatMembers &&
                chatMembers![0]?.role === ChatMemberRole.Admin &&
                (isRenameChatNameInputOpen ? (
                  <button
                    onClick={() => {
                      setIsRenameChatNameInputOpen(false);
                    }}
                    className="text-sm font-semibold bg-zinc-200 text-black px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsRenameChatNameInputOpen(true)}
                    className="text-sm font-semibold bg-zinc-800 px-2 py-1 rounded-md"
                  >
                    Change
                  </button>
                ))}
            </>
          </div>
        )}
      </>
      <div
        className={mergeClasses(
          "border-b border-zinc-800 overflow-y-auto",
          chatMembers && chatMembers.length > 4 && "h-64"
        )}
      >
        <div className="pt-2 flex flex-col gap-1 ">
          <h3 className="px-4 text-sm font-semibold  ">
            {chat.totalMembersCount} Members
          </h3>
          <div className="flex flex-col py-1 text-sm">
            {chatMembers?.map((member) => {
              return (
                <div className="px-4 flex justify-between items-center py-2 cursor-pointer hover:bg-zinc-900">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Image
                        src={member?.user?.profileImageURL!}
                        alt="member-image"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {member?.user?.username === sessionUser?.username
                          ? "You"
                          : member?.user?.firstName +
                            " " +
                            member?.user?.lastName}
                      </h3>
                      <h3 className="text-zinc-500 text-sm">
                        @{member?.user?.username}
                      </h3>
                    </div>
                  </div>
                  {chat.isGroupChat && (
                    <div className="flex items-center gap-2">
                      {member?.role === ChatMemberRole.Admin && (
                        <div className="flex justify-center">
                          <h2 className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-200 text-black  ">
                            Admin
                          </h2>
                        </div>
                      )}
                      <Menu
                        size={15}
                        strokeWidth={3}
                        className="text-zinc-500 cursor-pointer active:scale-[0.95]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
