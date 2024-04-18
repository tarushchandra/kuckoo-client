import React from "react";
import Header from "@/components/header";
import HeaderOptions from "@/components/header-options";
import Link from "next/link";
import { getUser } from "@/services/user";

interface FollowsLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

export default async function FollowsLayout(props: FollowsLayoutProps) {
  const { params, children } = props;
  const { username } = params;
  const user = await getUser(username);

  return (
    <>
      <Header>
        <div className="flex flex-col items-start px-4 py-2">
          <Link href={`/profile/${username}`} className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </Link>
          <h2 className="text-sm text-zinc-500">0 Posts</h2>
        </div>
        <HeaderOptions username={username} />
      </Header>
      {children}
    </>
  );
}
