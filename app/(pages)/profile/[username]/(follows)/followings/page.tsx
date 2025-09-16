"use client";
import UserCardLoading from "@/components/ui/user-card-loading";
import UserCard from "@/components/user-card";
import { useFollowings } from "@/hooks/queries/user";
import { ProfilePageProps } from "../../page";

export default function MyFollowings({ params }: ProfilePageProps) {
  const { username } = params;
  const followings = useFollowings(username);

  if (!followings)
    return (
      <div className="px-4 py-4 flex flex-col gap-2">
        {Array.from({ length: 11 }, (_, index) => (
          <UserCardLoading
            key={index}
            className="px-2 py-3"
            nameClassName="w-40"
            userNameClassName="w-32"
          />
        ))}
      </div>
    );

  if (followings.length === 0)
    return (
      <div className="px-4 py-4 flex flex-col gap-2">
        <h1 className="text-center text-xl font-medium">No Followings</h1>
      </div>
    );

  return (
    <div className="p-4 flex flex-col gap-2">
      {followings.map((following: any) => (
        <UserCard
          key={following?.id}
          className="px-2 py-3 rounded-lg hover:bg-zinc-950"
          buttonClassName="px-4 py-2"
          user={following}
        />
      ))}
    </div>
  );
}
