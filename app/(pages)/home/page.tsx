"use client";
import Header from "@/components/header";
import CreatePost from "@/components/create-post";
import { MODE } from "@/components/create-post-modal";
import PostsFeed from "@/components/posts-feed";

export default function HomePage() {
  return (
    <>
      <Header className="p-4 text-xl font-semibold">Posts Feed</Header>
      <CreatePost
        mode={MODE.CREATE_POST}
        showCancelButton={false}
        containerClassName="border-b border-zinc-800 hidden sm:flex"
        buttonClassName="text-sm py-2"
      />
      <PostsFeed />
    </>
  );
}
