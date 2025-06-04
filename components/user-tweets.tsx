"use client";
import { getPaginatedUserTweetsQuery } from "@/graphql/queries/tweet";
import Tweets from "./tweets";
import { User } from "@/gql/graphql";
// import { useInfiniteUserTweets } from "@/hooks/services/tweet";
import { graphqlClient } from "@/lib/clients/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteUserTweets } from "@/hooks/queries/tweet";

export default function UserTweets({ user }: { user: User }) {
  const { userTweets, isFetchingNextPage, observe } = useInfiniteUserTweets(
    user.id,
    2
  );

  const modifiedTweets = userTweets?.map((tweet: any) => ({
    ...tweet,
    author: user,
  }));

  return (
    <Tweets
      tweets={modifiedTweets!}
      observe={observe}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
