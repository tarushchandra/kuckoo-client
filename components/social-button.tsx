"use client";
import { User } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth/auth";
import { selectUser } from "@/redux/features/auth/authSlice";
import React, { useLayoutEffect, useState } from "react";
import { useFollowUser, useUnfollowUser } from "@/hooks/auth/user";
import { usePathname } from "next/navigation";
import mergeClasses from "@/utils/mergeClasses";
import revalidateProfileUser from "@/lib/actions/user";

interface SocialButtonProps {
  user: User;
  className?: string;
}

export default function SocialButton({ user, className }: SocialButtonProps) {
  const { data: sessionUser } = useAuth(selectUser);
  const [amIFollowing, setAmIFollowing] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();

  useLayoutEffect(() => {
    if (sessionUser?.username === user.username) return;

    const doIFollow = user.followers?.find(
      (user) => user?.username === sessionUser?.username
    );
    if (!doIFollow) return setAmIFollowing(false);
    setAmIFollowing(true);
  }, [user.username, user.followers]);

  const handleFollowUser = async (userId: string) => {
    setIsLoading(true);
    const didIFollowed = await useFollowUser(userId);
    if (didIFollowed) setAmIFollowing(true);
    await revalidateProfileUser(sessionUser?.username!, user.username);
    setIsLoading(false);
  };

  const handleUnfollowUser = async (userId: string) => {
    setIsLoading(true);
    const didIUnfollowed = await useUnfollowUser(userId);
    if (didIUnfollowed) setAmIFollowing(false);
    await revalidateProfileUser(sessionUser?.username!, user.username);
    setIsLoading(false);
  };

  if (
    (pathName.includes("followers") || pathName.includes("followings")) &&
    user.username === sessionUser?.username
  )
    return;
  if (sessionUser?.username === user.username)
    return <Button className={className}>Edit Profile</Button>;
  if (!amIFollowing)
    return (
      <Button
        className={className}
        onClick={() => handleFollowUser(user.id)}
        isLoading={isLoading}
      >
        Follow
      </Button>
    );
  return (
    <Button
      className={className}
      onClick={() => handleUnfollowUser(user.id)}
      isLoading={isLoading}
    >
      Unfollow
    </Button>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

const Button = ({ children, isLoading, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={mergeClasses(
        "font-semibold text-md bg-white text-black rounded-full transition-all hover:bg-zinc-200 disabled:cursor-wait disabled:bg-zinc-400",
        className
      )}
    >
      {children}
    </button>
  );
};
