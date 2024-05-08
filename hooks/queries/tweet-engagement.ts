import { getTweetEngagementQuery } from "@/graphql/queries/tweet-engagement";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useTweetEngagement = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["tweet-engagement", tweetId],
    queryFn: () => graphqlClient.request(getTweetEngagementQuery, { tweetId }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["tweet-engagement", tweetId] });
    };
  }, [tweetId]);

  return data?.getTweet?.tweetEngagement;
};
