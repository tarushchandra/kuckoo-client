"use client";
import { useUserTweets } from "@/hooks/queries/tweet";
import Tweets from "./tweets";
import { User } from "@/gql/graphql";

export default function UserTweets({ user }: { user: User }) {
  const tweets = useUserTweets(user.username);
  const modifiedTweets = tweets?.map((tweet: any) => ({
    ...tweet,
    author: user,
  }));

  return <Tweets tweets={modifiedTweets!} />;
}
