import { User } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "./ui/skeleton";

// interface UserCardProps {
//   firstName?: string;
//   lastName?: string | null;
//   username?: string;
//   profileImageURL?: string | null;
// }

interface UserCardProps {
  user: User | null;
}

const UserCard: React.FC<UserCardProps> = ({ user }: UserCardProps) => {
  const { firstName, lastName, username, profileImageURL } = user;

  return (
    <Link href={`/profile/${username}`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={profileImageURL ? profileImageURL : ""}
            className="rounded-full"
            alt="user-image"
            width={45}
            height={45}
          />
          <div className="flex flex-col text-sm">
            <span className="font-semibold">
              {firstName} {lastName}
            </span>
            <span className="text-gray-500">@{username}</span>
          </div>
        </div>
        <button className="bg-white text-black px-3 py-1 font-bold rounded-full transition-all hover:bg-zinc-200">
          Follow
        </button>
      </div>
    </Link>
  );
};

export default UserCard;
