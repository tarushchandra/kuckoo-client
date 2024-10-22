"use client";
import UserCardLoading from "@/components/ui/user-card-loading";
import UserCard from "@/components/user-card";
import { useFollowers } from "@/hooks/queries/user";
import { ProfilePageProps } from "../../page";

export default function FollowersPage({ params }: ProfilePageProps) {
  const { username } = params;
  const followers = useFollowers(username);

  if (!followers)
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

  if (followers.length === 0)
    return (
      <div className="px-4 py-4 flex flex-col gap-2">
        <h1 className="text-center text-xl font-medium">No Followers</h1>
      </div>
    );

  return (
    <div className="p-4 flex flex-col gap-2">
      {followers.map((follower: any) => {
        return (
          <UserCard
            className="px-2 py-3 rounded-lg hover:bg-zinc-950"
            buttonClassName="px-4 py-2"
            key={follower?.id}
            user={follower}
            showRemoveButton={true}
            profileUsername={username}
          />
        );
      })}
    </div>
  );
}
