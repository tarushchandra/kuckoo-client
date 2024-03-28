import React from "react";
import { useUser } from "@/hooks/auth/user";
import Header from "@/components/header";
import HeaderOptions from "@/components/header-options";

interface FollowsLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

export default async function FollowsLayout(props: FollowsLayoutProps) {
  const { params, children } = props;
  const { username } = params;
  const user = await useUser(username);

  return (
    <>
      <Header>
        <div className="flex flex-col items-start px-4 py-2">
          <h1 className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </h1>
          <h2 className="text-sm text-zinc-500">0 Posts</h2>
        </div>
        <HeaderOptions username={username} />
      </Header>
      {children}
    </>
  );
}
