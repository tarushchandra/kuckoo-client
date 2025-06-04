import { Tweet } from "@/gql/graphql";
import {
  getPaginatedTweetsFeedQuery,
  getPaginatedUserTweetsQuery,
  getTweetQuery,
} from "@/graphql/queries/tweet";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntersection } from "../utils";

// export const useInfiniteUserTweets = (userId: string, limit: number) => {
//   const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
//     useInfiniteQuery({
//       queryKey: ["user-tweets", userId],
//       queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
//         graphqlClient.request(getPaginatedUserTweetsQuery, {
//           userId,
//           limit,
//           cursor: pageParam,
//         }),
//       initialPageParam: undefined,
//       getNextPageParam: (lastPage) => lastPage.getPaginatedTweets.nextCursor,
//     });
//   const userTweets = useMemo(() => {
//     return data?.pages.flatMap((x) => x.getPaginatedTweets.tweets);
//   }, [data?.pages.length]);
//   const { ref: lastTweetRef, isIntersecting } = useIntersection({}, userTweets);

//   useEffect(() => {
//     if (isIntersecting && hasNextPage) fetchNextPage();
//   }, [isIntersecting]);

//   return {
//     userTweets,
//     isFetchingNextPage,
//     lastTweetRef,
//   };
// };

export const useInfiniteUserTweets = (userId: string, limit: number) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["user-tweets", userId],
      queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
        graphqlClient.request(getPaginatedUserTweetsQuery, {
          userId,
          limit,
          cursor: pageParam,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.getPaginatedTweets.nextCursor,
    });
  const { observe, isIntersecting } = useIntersection();

  const userTweets = useMemo(
    () => data?.pages.flatMap((x) => x.getPaginatedTweets.tweets),
    [data?.pages.length]
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage]);

  return {
    userTweets,
    isFetchingNextPage,
    observe,
  };
};

// export const useTweetsFeed = (sessionUsername: string) => {
//   const { data } = useQuery({
//     queryKey: ["tweets-feed", sessionUsername],
//     queryFn: () => graphqlClient.request(getTweetsFeedQuery),
//   });

//   useEffect(() => {
//     return () => {
//       queryClient.removeQueries({
//         queryKey: ["tweets-feed", sessionUsername],
//       });
//     };
//   }, [sessionUsername]);

//   return data?.getTweetsFeed;
// };

export const useInfiniteTweetsFeed = (userId: string, limit: number) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["tweets-feed", userId],
      queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
        graphqlClient.request(getPaginatedTweetsFeedQuery, {
          limit,
          cursor: pageParam,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.getPaginatedTweetsFeed.nextCursor,
    });
  const { observe, isIntersecting } = useIntersection();

  const tweetsFeed = useMemo(
    () => data?.pages.flatMap((x) => x.getPaginatedTweetsFeed.tweets),
    [data?.pages.length]
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage]);

  return {
    tweetsFeed,
    isFetchingNextPage,
    observe,
  };
};

export const useTweet = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["tweet", tweetId],
    queryFn: () => graphqlClient.request(getTweetQuery, { tweetId }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["tweet", tweetId] });
    };
  }, [tweetId]);

  return data?.getTweet;
};
