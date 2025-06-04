"use client";
import React from "react";
import TweetCard from "./tweet-card";
import TweetCardLoading from "./ui/tweet-card-loading";

interface TweetsProps {
  tweets: any[] | undefined;
  observe: (node: Element) => void;
  isFetchingNextPage: boolean;
}

export default function Tweets(props: TweetsProps) {
  const { tweets, isFetchingNextPage, observe } = props;

  if (!tweets)
    return Array.from({ length: 4 }, (_, index) => (
      <TweetCardLoading key={index} />
    ));

  return (
    <div>
      {tweets.length > 0 ? (
        <>
          {tweets.map((tweet: any, index) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              ref={index === tweets.length - 1 ? observe : null}
            />
          ))}
          {isFetchingNextPage && (
            <h2 className="text-zinc-500 animate-pulse text-center my-2">
              Loading...
            </h2>
          )}
        </>
      ) : (
        <h1 className="text-center mt-2">No Tweets yet</h1>
      )}
    </div>
  );
}
