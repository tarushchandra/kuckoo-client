"use client";
import { User } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import React from "react";
import { usePathname } from "next/navigation";
import mergeClasses from "@/utils/mergeClasses";
import { useIsFollowing } from "@/hooks/queries/user";
import Skeleton from "./ui/skeleton";
import {
  useFollowUser,
  useRemoveFollower,
  useUnfollowUser,
} from "@/hooks/mutations/user";

interface SocialButtonProps {
  targetUser: User;
  className?: string;
  showRemoveButton?: boolean;
  profileUsername?: string;
}

export default function SocialButtons(props: SocialButtonProps) {
  const {
    targetUser,
    className,
    showRemoveButton = false,
    profileUsername,
  } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const pathName = usePathname();

  const amIFollowing = useIsFollowing(sessionUser?.id!, targetUser.id);
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();
  const removeFollower = useRemoveFollower();

  // console.log(`amIFollowing ${targetUser.username} -`, amIFollowing);

  if (sessionUser?.username === targetUser.username) return;
  if (amIFollowing === undefined || amIFollowing === null) return;

  // if (
  //   showRemoveButton &&
  //   sessionUser?.username === profileUsername &&
  //   (amIFollowing === undefined || amIFollowing === null)
  // ) {
  //   return (
  //     <div className="flex gap-2">
  //       <Skeleton className="w-20 h-10 rounded-full" />
  //       <Skeleton className="w-20 h-10 rounded-full" />
  //     </div>
  //   );
  // }

  // if (amIFollowing === undefined || amIFollowing === null) {
  //   return <Skeleton className="w-28 h-10 rounded-full" />;
  // }

  const followsMutationPayload = {
    sessionUserId: sessionUser?.id!,
    targetUserId: targetUser.id,
    sessionUsername: sessionUser?.username!,
    targetUsername: targetUser.username,
  };

  const handleFollowUser = async () =>
    followUser.mutate(followsMutationPayload);

  const handleUnfollowUser = () => unfollowUser.mutate(followsMutationPayload);

  const handleRemoveFollower = () => {
    if (removeFollower.isSuccess) return;
    removeFollower.mutate(followsMutationPayload);
  };

  if (
    (pathName.includes("followers") || pathName.includes("followings")) &&
    targetUser.username === sessionUser?.username
  )
    return;

  if (sessionUser?.username === targetUser.username) return;

  return (
    <div className="flex gap-2 justify-start items-center">
      <>
        {amIFollowing ? (
          <Button
            className={mergeClasses(
              className,
              "bg-zinc-800 border border-zinc-700 hover:bg-zinc-900",
              unfollowUser.isPending && "text-zinc-400 disabled:bg-zinc-900"
            )}
            onClick={handleUnfollowUser}
            isLoading={unfollowUser.isPending}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            className={mergeClasses(
              className,
              "bg-white text-black border border-zinc-400 hover:bg-zinc-200",
              followUser.isPending && "text-zinc-900 disabled:bg-zinc-400"
            )}
            onClick={handleFollowUser}
            isLoading={followUser.isPending}
          >
            Follow
          </Button>
        )}
      </>
      <>
        {showRemoveButton && sessionUser?.username === profileUsername && (
          <Button
            className={mergeClasses(
              className,
              "bg-red-600 hover:bg-red-700",
              removeFollower.isSuccess &&
                "text-zinc-400 bg-red-950 cursor-not-allowed hover:bg-red-950"
            )}
            isLoading={removeFollower.isPending}
            onClick={handleRemoveFollower}
          >
            Remove
          </Button>
        )}
      </>
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const Button = ({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={mergeClasses(
        "font-semibold text-sm rounded-full transition-all disabled:cursor-wait",
        className
      )}
    >
      {children}
    </button>
  );
};
