"use client";

import React from "react";
import TweetCard from "./tweet-card";
import { Tweet } from "@/gql/graphql";
import TweetCardLoading from "./ui/tweet-card-loading";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { useTweetsFeed, useUserTweets } from "@/hooks/queries/tweet";

interface TweetsProps {
  tweets: any[] | undefined;
}

export default function Tweets(props: TweetsProps) {
  const { tweets } = props;

  if (!tweets)
    return Array.from({ length: 4 }, (_, index) => (
      <TweetCardLoading key={index} />
    ));

  return (
    <div>
      {tweets.length > 0 ? (
        tweets.map((tweet: any) => <TweetCard key={tweet.id} tweet={tweet} />)
      ) : (
        <h1 className="text-center mt-2">No Tweets yet</h1>
      )}
    </div>
  );
}
