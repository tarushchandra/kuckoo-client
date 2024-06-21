import UserCard from "./user-card";
import UserCardLoading from "./ui/user-card-loading";
import Modal from "./ui/modal";
import { X } from "lucide-react";
import { useAllUsers } from "@/hooks/queries/user";
import Link from "next/link";
import Image from "next/image";
import { getChat } from "@/services/chat";
import { ChangeEvent, useEffect, useState } from "react";
import { Chat as ChatType, User } from "@/gql/graphql";
import { getUsers } from "@/services/user";
import { useSearchUsers } from "@/hooks/services/user";

interface NewChatModal {
  onClose: () => void;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatType | null>>;
}

export default function NewChatModal(props: NewChatModal) {
  const { onClose, setSelectedChat } = props;
  const [searchText, setSearchText] = useState("");
  const { users, isUsersLoading } = useSearchUsers(getUsers, searchText);
  const [isChatCreatedLoading, setIsChatCreatedLoading] = useState(false);

  // console.log("searchText -", searchText);
  // console.log("users -", users);

  const handleSendMessage = async (targetUser: User) => {
    setIsChatCreatedLoading(true);
    const chat = await getChat(targetUser.id);
    setIsChatCreatedLoading(false);

    if (chat)
      setSelectedChat({
        ...chat,
        members: [targetUser],
      } as any);
    else setSelectedChat({ id: null!, members: [targetUser] });

    onClose();
  };

  return (
    <Modal
      wrapperId="new-chat-modal"
      onClose={onClose}
      modalClassName="z-[1000]"
      bgClassName="z-[500]"
    >
      <div className="w-[25rem] h-[25rem] pt-3 flex flex-col gap-2">
        <h1 className="text-md font-semibold text-center pb-2 border-b border-zinc-800">
          New Chat
        </h1>
        <div className="px-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search users..."
            className="w-full rounded-md text-sm bg-zinc-950 px-2 py-1 border border-zinc-800 focus:outline-none"
          />
        </div>
        <div className="overflow-y-auto h-full border-t py-2 border-zinc-800">
          {!isUsersLoading ? (
            users.length > 0 ? (
              users.map((user: any) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center px-4 py-3 hover:bg-zinc-950"
                >
                  <Link href={`/profile/${user.username}`}>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={user.profileImageURL ? user.profileImageURL : ""}
                          className="rounded-full"
                          alt="user-image"
                          width={45}
                          height={45}
                        />
                        <div className="flex flex-col text-sm">
                          <span className="font-semibold hover:underline">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="text-gray-500">
                            @{user.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    disabled={isChatCreatedLoading}
                    onClick={() => handleSendMessage(user)}
                    className="text-sm bg-white text-black rounded-full font-semibold px-4 py-2 transition-all hover:bg-zinc-200 disabled:cursor-wait"
                  >
                    Message
                  </button>
                </div>
              ))
            ) : (
              <h1 className="text-center font-semibold text-sm">
                No Users found
              </h1>
            )
          ) : (
            Array.from({ length: 4 }, (_, index) => (
              <UserCardLoading
                key={index}
                className="px-4 py-3"
                skeletonClassName="bg-zinc-900"
                nameClassName="w-32"
                userNameClassName="w-24"
              />
            ))
          )}
        </div>
      </div>
      <X
        onClick={onClose}
        size={22}
        className="absolute top-3 right-2 bg-zinc-800 rounded-full p-1 cursor-pointer text-zinc-400 transition-all hover:text-white"
      />
    </Modal>
  );
}
