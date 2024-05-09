import UserCard from "./user-card";
import Link from "next/link";
import UserCardLoading from "./ui/user-card-loading";
import Modal from "./ui/modal";
import { X } from "lucide-react";
import { useDetailedTweetsLikedBy } from "@/hooks/queries/tweet-engagement";

export default function LikedByModal({
  tweetId,
  onClose,
}: {
  tweetId: string;
  onClose: () => void;
}) {
  const users = useDetailedTweetsLikedBy(tweetId);

  console.log("detailed users -", users);

  return (
    <Modal wrapperId="liked-by-modal" onClose={onClose}>
      <div className="w-[25rem] h-[22rem] pt-4 flex flex-col gap-2">
        <h1 className="text-md font-semibold text-center">Likes</h1>
        <div className="overflow-y-auto h-full border-t border-zinc-800 p-2">
          {users
            ? users.map((user: any) => (
                <UserCard
                  key={user?.id}
                  className="px-4 py-3 rounded-lg hover:bg-zinc-950"
                  buttonClassName="px-4 py-2"
                  user={user}
                />
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
        className="absolute top-4 right-2 bg-zinc-800 rounded-full p-1 cursor-pointer"
      />
    </Modal>
  );
}

{
  /* <X
  onClick={onClose}
  size={22}
  className="absolute  right-2 bg-zinc-800 rounded-full p-1 cursor-pointer"
/>; */
}
