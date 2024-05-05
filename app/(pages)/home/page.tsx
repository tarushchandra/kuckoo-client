"use client";
import Header from "@/components/header";
import TweetsFeed from "@/components/tweets-feed";
import PostTweet from "@/components/post-tweet";
import { MODE } from "@/components/post-tweet-modal";

export default function HomePage() {
  return (
    <>
      <Header className="p-4 text-xl font-semibold">Home</Header>
      <PostTweet
        mode={MODE.CREATE_TWEET}
        showCancelButton={false}
        containerClassName="border-b border-zinc-800"
        buttonClassName="text-sm py-2"
      />
      <TweetsFeed />
    </>
  );
}
