import { usePeopleWithMessageSeen } from "@/hooks/queries/chat";
import Modal from "./ui/modal";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Chat, User } from "@/gql/graphql";
import { getChat } from "@/services/chat";
import UserCardLoading from "./ui/user-card-loading";
import Link from "next/link";

interface MessageSeenByModalProps {
  onClose: () => void;
  messageId: string;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export default function MessageSeenByModal(props: MessageSeenByModalProps) {
  const { messageId, onClose, setSelectedChat } = props;
  const users = usePeopleWithMessageSeen(messageId);
  const [isChatCreatedLoading, setIsChatCreatedLoading] = useState(false);

  console.log("seen by - ", users);

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
      wrapperId="message-seen-by-modal"
      onClose={onClose}
      modalClassName="z-[1000]"
      bgClassName="z-[500]"
    >
      <div className="w-[25rem] h-[22rem] pt-2 flex flex-col gap-2">
        <h1 className="text-sm font-semibold text-center">Seen by</h1>
        <div className="overflow-y-auto h-full border-t border-zinc-800 p-2">
          {users
            ? users.map((user: any) => (
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
            : Array.from({ length: 4 }, (_, index) => (
                <UserCardLoading
                  key={index}
                  className="px-4 py-3"
                  skeletonClassName="bg-zinc-900"
                  nameClassName="w-32"
                  userNameClassName="w-24"
                />
              ))}
        </div>
      </div>
      <X
        onClick={onClose}
        size={22}
        className="absolute top-2 right-2 bg-zinc-800 rounded-full p-1 cursor-pointer text-zinc-400 transition-all hover:text-white"
      />
    </Modal>
  );
}
