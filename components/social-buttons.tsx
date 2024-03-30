"use client";
import { User } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth/auth";
import { selectUser } from "@/redux/features/auth/authSlice";
import React, { useLayoutEffect, useState } from "react";
import {
  useFollowUser,
  useRemoveFollower,
  useUnfollowUser,
} from "@/hooks/auth/user";
import { usePathname } from "next/navigation";
import mergeClasses from "@/utils/mergeClasses";
import revalidateProfileUser from "@/lib/actions/user";
import { useRouter } from "@/hooks/router/router";

interface SocialButtonProps {
  user: User;
  className?: string;
  showRemoveButton?: boolean;
  profileUsername?: string;
}

interface IremoveButton {
  isLoading: boolean;
  isSuccess: boolean;
}

export default function SocialButtons(props: SocialButtonProps) {
  const { user, className, showRemoveButton, profileUsername } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const pathName = usePathname();
  const [amIFollowing, setAmIFollowing] = useState<boolean | null>(null);
  const [isFollowsButtonLoading, setIsFollowsButtonLoading] = useState(false);
  const [removeButton, setRemoveButton] = useState<IremoveButton>({
    isLoading: false,
    isSuccess: false,
  });

  useLayoutEffect(() => {
    if (sessionUser?.username === user.username) return;

    const doIFollow = user.followers?.find(
      (user) => user?.username === sessionUser?.username
    );
    if (!doIFollow) return setAmIFollowing(false);
    setAmIFollowing(true);
  }, [user.username, user.followers]);

  const handleFollowUser = async (userId: string) => {
    setIsFollowsButtonLoading(true);
    const didIFollowed = await useFollowUser(userId);
    if (didIFollowed) {
      await revalidateProfileUser(sessionUser?.username!, user.username);
      setAmIFollowing(true);
    }
    setIsFollowsButtonLoading(false);
  };

  const handleUnfollowUser = async (userId: string) => {
    setIsFollowsButtonLoading(true);
    const didIUnfollowed = await useUnfollowUser(userId);
    if (didIUnfollowed) {
      await revalidateProfileUser(sessionUser?.username!, user.username);
      setAmIFollowing(false);
    }
    setIsFollowsButtonLoading(false);
  };

  const handleRemoveFollower = async (userId: string) => {
    if (removeButton.isSuccess) return;
    setRemoveButton((btn) => ({ ...btn, isLoading: true }));
    const didIRemoved = await useRemoveFollower(userId);
    if (didIRemoved) {
      await revalidateProfileUser(sessionUser?.username!, user.username);
      setRemoveButton((btn) => ({ ...btn, isSuccess: true }));
    }
    setRemoveButton((btn) => ({ ...btn, isLoading: false }));
  };

  if (
    (pathName.includes("followers") || pathName.includes("followings")) &&
    user.username === sessionUser?.username
  )
    return;

  if (sessionUser?.username === user.username)
    return <Button className={className}>Edit Profile</Button>;

  return (
    <div className="flex gap-2">
      <>
        {amIFollowing ? (
          <Button
            className={mergeClasses(
              className,
              isFollowsButtonLoading && "disabled:bg-zinc-400"
            )}
            onClick={() => handleUnfollowUser(user.id)}
            isLoading={isFollowsButtonLoading}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            className={mergeClasses(
              className,
              isFollowsButtonLoading && "disabled:bg-zinc-400"
            )}
            onClick={() => handleFollowUser(user.id)}
            isLoading={isFollowsButtonLoading}
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
              removeButton.isSuccess &&
                "bg-zinc-500 cursor-not-allowed hover:bg-zinc-500"
            )}
            isLoading={removeButton.isLoading}
            onClick={() => handleRemoveFollower(user.id)}
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
        "font-semibold text-sm bg-white text-black rounded-full transition-all hover:bg-zinc-200 disabled:cursor-wait",
        className
      )}
    >
      {children}
    </button>
  );
};
