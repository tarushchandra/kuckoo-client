import { User } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialButton from "./social-button";
import mergeClasses from "@/utils/mergeClasses";

interface UserCardProps {
  user: User;
  className?: string;
  buttonClassName?: string;
}

export const UserCard = (props: UserCardProps) => {
  const { user, className, buttonClassName } = props;
  const { firstName, lastName, username, profileImageURL } = user;

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
      <SocialButton user={{ ...user, username }} className={buttonClassName} />
    </div>
  );
};

export default UserCard;
