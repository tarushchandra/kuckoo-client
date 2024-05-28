import { getTweetQuery, getTweetsFeedQuery } from "@/graphql/queries/tweet";
import { getUserTweetsQuery } from "@/graphql/queries/user";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserTweets = (username: string) => {
  const { data } = useQuery({
    queryKey: ["user-tweets", username],
    queryFn: () => graphqlClient.request(getUserTweetsQuery, { username }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["user-tweets", username] });
    };
  }, [username]);

  return data?.getUser?.tweets;
};

export const useTweetsFeed = (sessionUsername: string) => {
  const { data } = useQuery({
    queryKey: ["tweets-feed", sessionUsername],
    queryFn: () => graphqlClient.request(getTweetsFeedQuery),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["tweets-feed", sessionUsername],
      });
    };
  }, [sessionUsername]);

  return data?.getTweetsFeed;
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
