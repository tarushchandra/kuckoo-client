"use client";
import UserCardLoading from "@/components/ui/user-card-loading";
import UserCard from "@/components/user-card";
import { useFollowers } from "@/hooks/auth/user";
import { queryClient } from "@/lib/clients/query";
import { useEffect } from "react";
import { ProfilePageProps } from "../../page";
import { useAuth } from "@/hooks/auth/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";

export default function FollowersPage({ params }: ProfilePageProps) {
  const { username } = params;
  const followers = useFollowers(username);
  const { data: sessionUser } = useAuth(selectUser);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["followers"] });
    };
  }, [username]);

  if (!followers)
    return (
      <div className="px-4 py-4 flex flex-col gap-2">
        {Array.from({ length: 11 }, (_, index) => (
          <UserCardLoading
            key={index}
            className="px-10 py-3"
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
    <div className="px-4 py-4 flex flex-col gap-2">
      {followers.map((follower: any) => {
        return (
          <UserCard
            className="px-10 py-3 rounded-lg hover:bg-zinc-900"
            buttonClassName="px-4 py-2"
            key={follower?.id}
            user={follower}
            showRemoveButton={true}
            sessionUser={sessionUser}
            profileUsername={username}
          />
        );
      })}
    </div>
  );
}
