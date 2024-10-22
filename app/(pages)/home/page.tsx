"use client";
import Header from "@/components/header";
import PostTweet from "@/components/post-tweet";
import { MODE } from "@/components/post-tweet-modal";
import TweetsFeed from "@/components/tweets-feed";

export default function HomePage() {
  return (
    <>
      <Header className="p-4 text-xl font-semibold">Tweets Feed</Header>
      <PostTweet
        mode={MODE.CREATE_TWEET}
        showCancelButton={false}
        containerClassName="border-b border-zinc-800 hidden sm:flex"
        buttonClassName="text-sm py-2"
      />
      <TweetsFeed />
    </>
  );
}
