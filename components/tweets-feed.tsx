"use client";

import React from "react";
import TweetCard from "./tweet-card";
import { Tweet, User } from "@/gql/graphql";
import TweetCardLoading from "./ui/tweet-card-loading";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { useTweetsFeed, useUserTweets } from "@/hooks/queries/tweet";

interface TweetsFeedProps {
  targetUser?: User;
}

export default function TweetsFeed(props: TweetsFeedProps) {
  const { targetUser } = props;
  const { data: sessionUser } = useAuth(selectUser);

  let tweets: any = [];
  if (targetUser) {
    tweets = useUserTweets(targetUser.username);
  } else {
    tweets = useTweetsFeed(sessionUser?.username!);
  }

  if (!tweets)
    return Array.from({ length: 4 }, (_, index) => (
      <TweetCardLoading key={index} />
    ));

  return (
    <div>
      {tweets.length > 0 ? (
        tweets.map((tweet: any) => (
          <TweetCard
            key={tweet.id}
            tweet={{ ...tweet, author: targetUser ? targetUser : tweet.author }}
          />
        ))
      ) : (
        <h1 className="text-center mt-2">No Tweets yet</h1>
      )}
    </div>
  );
}
