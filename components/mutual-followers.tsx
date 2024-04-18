"use client";

import { User } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { useMutualFollowers } from "@/hooks/queries/user";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./ui/skeleton";

interface MutualFollowersProps {
  myUsername: string;
}

export default function MutualFollowers({ myUsername }: MutualFollowersProps) {
  const { data: sessionUser } = useAuth(selectUser);
  if (sessionUser?.username === myUsername) return;

  const mutualFollowers = useMutualFollowers(myUsername);
  // const mutualFollowers = undefined;

  if (!mutualFollowers) return <Skeleton className="w-72 h-5" />;

  if (mutualFollowers?.length === 0)
    return (
      <h1 className="text-sm text-zinc-500">
        None of your followings follows{" "}
        <span className="text-white">@{myUsername}</span>
      </h1>
    );

  return (
    <Link
      href={`/profile/${myUsername}/followers`}
      className="flex gap-2 text-sm"
    >
      <h1 className=" text-zinc-500">Followed by -</h1>
      <div className="flex gap-1">
        {mutualFollowers?.map((mutualFollower) => {
          return (
            <div
              key={mutualFollower?.username}
              className="cursor-pointer"
              title={mutualFollower?.username}
            >
              <Image
                src={
                  mutualFollower?.profileImageURL
                    ? mutualFollower.profileImageURL
                    : ""
                }
                alt="profile-pic"
                className="rounded-full"
                width={18}
                height={18}
              />
            </div>
          );
        })}
      </div>
    </Link>
  );
}
