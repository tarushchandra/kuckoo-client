import { Chat, ChatMemberRole, ChatMembership } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { useChatMembers } from "@/hooks/queries/chat";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import mergeClasses from "@/utils/mergeClasses";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AddMembersModal from "./add-members-modal";
import { useRenameGroup } from "@/hooks/mutations/chat";
import { queryClient } from "@/lib/clients/query";
import ChatMemberOptionsModal from "./chat-member-options-modal";

interface ChatInfoProps {
  chat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export default function ChatInfo(props: ChatInfoProps) {
  const { chat, setSelectedChat } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const chatMembers = useChatMembers(chat.id);

  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  const [isRenameChatNameInputOpen, setIsRenameChatNameInputOpen] =
    useState(false);
  const [isChatMemberOptionsModalOpen, setIsChatMemberOptionsModalOpen] =
    useState(false);

  const [chatName, setChatName] = useState(chat.name!);
  const [selectedChatMember, setSelectedChatMember] =
    useState<ChatMembership | null>(null);

  const renameGroupMutation = useRenameGroup();

  const handleRenameGroup = async () => {
    await renameGroupMutation.mutateAsync({
      chatId: chat.id,
      name: chatName,
    });

    queryClient.setQueryData(["chats"], (prev: any) => {
      const mutatedChat = {
        ...prev.getChats.find((x: any) => x.id === chat.id),
        name: chatName,
      };
      const remainingChats = prev.getChats.filter((x: any) => x.id !== chat.id);

      return { getChats: [mutatedChat, ...remainingChats] };
    });

    setSelectedChat((prev: any) => ({
      ...prev,
      name: chatName,
    }));
    setIsRenameChatNameInputOpen(false);
  };

  if (!chatMembers)
    return (
      <div className="z-20 absolute right-0 bg-black border-l border-zinc-800 flex justify-center items-center h-full w-1/2">
        <h2 className="text-sm text-zinc-500 animate-pulse">Loading...</h2>
      </div>
    );

  return (
    <>
      <div className="bg-black h-full flex flex-col z-20 absolute right-0 border-l border-zinc-800 w-full xl:w-1/2">
        <h2 className="text-md py-4 text-center font-semibold bg-black border-b border-zinc-800">
          Chat Info
        </h2>
        <>
          {chat.isGroupChat && (
            <div className="px-4 py-4 flex justify-between items-center border-b border-zinc-800">
              <div className="font-semibold text-sm flex gap-2 items-center">
                <h3 className="">Name:</h3>
                <>
                  {isRenameChatNameInputOpen ? (
                    <input
                      value={chatName}
                      onChange={(e) => setChatName(e.target.value)}
                      type="text"
                      className="h-7 rounded-md bg-zinc-950 p-2 border border-zinc-800 focus:outline-none"
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
                      disabled={renameGroupMutation.isPending}
                      onClick={handleRenameGroup}
                      className={mergeClasses(
                        "text-sm font-semibold bg-zinc-200 text-black px-2 py-1 rounded-md transition-all",
                        renameGroupMutation.isPending &&
                          "text-zinc-900 disabled:bg-zinc-400 cursor-wait"
                      )}
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
        <div className={mergeClasses("flex flex-col h-full justify-between")}>
          <div className="h-full pt-4 flex flex-col gap-1 overflow-y-auto">
            <div className="px-4 font-semibold text-sm flex justify-between items-center">
              <h3>{chat.totalMembersCount} Members</h3>
              {chat.isGroupChat && (
                <button
                  onClick={() => setIsAddMembersModalOpen(true)}
                  className="text-[#1D9BF0]"
                >
                  Add Members
                </button>
              )}
            </div>
            <div className="flex flex-col py-2 text-sm">
              {chatMembers?.map((member) => {
                return (
                  <div
                    key={member?.user?.id}
                    className="px-4 flex justify-between items-center py-3 cursor-pointer hover:bg-zinc-900"
                  >
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
                      <div className="relative flex flex-col items-end gap-2">
                        {member?.role === ChatMemberRole.Admin && (
                          <h2 className="text-xs font-semibold px-2 py-1 rounded-md bg-zinc-200 text-black  ">
                            Admin
                          </h2>
                        )}
                        {member?.user?.username !== sessionUser?.username &&
                          chatMembers[0]?.role === ChatMemberRole.Admin && (
                            <Menu
                              onClick={() => {
                                setIsChatMemberOptionsModalOpen(true);
                                setSelectedChatMember(member as any);
                              }}
                              size={15}
                              strokeWidth={3}
                              className="text-zinc-500 cursor-pointer active:scale-[0.95]"
                            />
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t border-zinc-800 text-sm px-4 py-8 flex flex-col gap-4 justify-center items-center">
            {chat.isGroupChat ? (
              <button className="bg-red-600 text-white  px-4 py-2 font-bold rounded-full transition-all hover:bg-red-700">
                Leave Group
              </button>
            ) : (
              <>
                <button className="bg-red-600 text-white  px-4 py-2 font-bold rounded-full transition-all hover:bg-red-700">
                  Block {chatMembers![1]?.user?.firstName}
                </button>
                <button className="bg-red-600 text-white  px-4 py-2 font-bold rounded-full transition-all hover:bg-red-700">
                  Delete Chat
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isAddMembersModalOpen && (
        <AddMembersModal
          onClose={() => setIsAddMembersModalOpen(false)}
          chat={chat}
          setSelectedChat={setSelectedChat}
        />
      )}

      {isChatMemberOptionsModalOpen && (
        <ChatMemberOptionsModal
          onClose={() => setIsChatMemberOptionsModalOpen(false)}
          chatMember={selectedChatMember!}
          chat={chat}
        />
      )}
    </>
  );
}
