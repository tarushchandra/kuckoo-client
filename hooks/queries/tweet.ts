import { getTweetsFeedQuery } from "@/graphql/queries/tweet";
import { getUserTweetsQuery } from "@/graphql/queries/user";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserTweets = (username: string) => {
  const { data } = useQuery({
    queryKey: ["tweets", username],
    queryFn: () => graphqlClient.request(getUserTweetsQuery, { username }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["tweets", username] });
    };
  }, [username]);

  return data?.getUser?.tweets;
};

export const useTweetsFeed = (sessionUsername: string) => {
  const { data } = useQuery({
    queryKey: ["tweets", sessionUsername],
    queryFn: () => graphqlClient.request(getTweetsFeedQuery),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["tweets", sessionUsername] });
    };
  }, [sessionUsername]);

  return data?.getTweetsFeed;
};
