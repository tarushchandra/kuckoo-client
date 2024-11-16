import { X } from "lucide-react";
import Modal from "./ui/modal";
import UserCardLoading from "./ui/user-card-loading";
import Image from "next/image";
import { useSearchUsers } from "@/hooks/services/user";
import { useState } from "react";
import { Chat, User } from "@/gql/graphql";
import { FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import { useAddMembersToGroup } from "@/hooks/mutations/chat";
import mergeClasses from "@/utils/mergeClasses";
import { getAvailableMembers } from "@/services/chat";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { useAuth } from "@/hooks/auth";

interface AddMembersModalProps {
  onClose: () => void;
  chat: Chat;
}

export default function AddMembersModal(props: AddMembersModalProps) {
  const { onClose, chat } = props;
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const addMembersToGroupMutation = useAddMembersToGroup(selectedUsers);
  const { users, isUsersLoading } = useSearchUsers(
    getAvailableMembers,
    searchText,
    chat.id
  );

  return (
    <Modal
      wrapperId="new-group-modal"
      onClose={onClose}
      modalClassName="z-[1000]"
      bgClassName="z-[500]"
    >
      <div className="w-[30rem] h-[30rem] py-2 flex flex-col gap-2">
        <h1 className="text-md font-semibold text-center pb-2 border-b border-zinc-800">
          Add members
        </h1>
        <div className="px-4 flex flex-col gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search users..."
            className="w-full rounded-md text-sm bg-zinc-950 px-2 py-1 border border-zinc-800 focus:outline-none"
          />
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedUsers.map((selectedUser) => (
                <div
                  key={selectedUser.id}
                  className="flex gap-1 items-center w-fit bg-white text-black px-2 rounded-full font-semibold"
                >
                  <h2 className="text-sm">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h2>
                  <X
                    size={17}
                    className="cursor-pointer"
                    onClick={() =>
                      setSelectedUsers((prev) =>
                        prev.filter((x) => x.id !== selectedUser.id)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="overflow-y-auto h-full border-y py-2 border-zinc-800">
          {!isUsersLoading ? (
            users.length > 0 ? (
              users.map((user: any) => (
                <div
                  onClick={() => {
                    setSelectedUsers((prev) => [...prev, user]);
                    setSearchText("");
                  }}
                  key={user.id}
                  className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-zinc-950"
                >
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
                        <span className="text-gray-500">@{user.username}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {selectedUsers.find(
                      (selectedUser) => selectedUser.id === user.id
                    ) ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaPlusCircle />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center font-semibold text-sm">
                No Users found
              </h1>
            )
          ) : (
            Array.from({ length: 5 }, (_, index) => (
              <UserCardLoading
                key={index}
                className="px-4 py-3"
                skeletonClassName="bg-zinc-900"
                nameClassName="w-44"
                userNameClassName="w-32"
              />
            ))
          )}
        </div>
        <button
          onClick={async () => {
            await addMembersToGroupMutation.mutateAsync({
              chatId: chat.id,
              targetUserIds: selectedUsers.map((x) => x.id),
            });
            onClose();
          }}
          disabled={
            addMembersToGroupMutation.isPending || selectedUsers.length === 0
          }
          className={mergeClasses(
            "bg-[#1D9BF0] mx-2 p-2 text-sm font-semibold rounded-md transition-all hover:bg-[#1993e6]",
            addMembersToGroupMutation.isPending && "cursor-wait"
          )}
        >
          Save
        </button>
      </div>
      <X
        onClick={onClose}
        size={22}
        className="absolute top-2 right-2 bg-zinc-800 rounded-full p-1 cursor-pointer text-zinc-400 transition-all hover:text-white"
      />
    </Modal>
  );
}
