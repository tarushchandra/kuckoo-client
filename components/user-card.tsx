import { User } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialButton, { Button } from "./social-buttons";
import mergeClasses from "@/utils/mergeClasses";

interface UserCardProps {
  user: User;
  className?: string;
  buttonClassName?: string;
  showRemoveButton?: boolean;
  profileUsername?: string;
}

export const UserCard = (props: UserCardProps) => {
  const { user, className, buttonClassName, profileUsername } = props;
  const { firstName, lastName, username, profileImageURL } = user;
  const showRemoveButton = props.showRemoveButton || false;

  return (
    <div
      className={mergeClasses("flex justify-between items-center", className)}
    >
      <Link href={`/profile/${username}`}>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <Image
              src={profileImageURL ? profileImageURL : ""}
              className="rounded-full"
              alt="user-image"
              width={45}
              height={45}
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold hover:underline">
                {firstName} {lastName}
              </span>
              <span className="text-gray-500">@{username}</span>
            </div>
          </div>
        </div>
      </Link>
      <SocialButton
        targetUser={{ ...user, username }}
        className={buttonClassName}
        profileUsername={profileUsername}
        showRemoveButton={showRemoveButton}
      />
    </div>
  );
};

export default UserCard;
