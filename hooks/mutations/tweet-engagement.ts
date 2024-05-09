import { TweetEngagement } from "@/gql/graphql";
import {
  dislikeTweetMutation,
  likeTweetMutation,
} from "@/graphql/mutations/tweet-engagement";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

interface OptimisticUpdaters {
  setIsTweetLikedBySessionUser: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
}

export const useLikeTweet = (fns: OptimisticUpdaters) => {
  const path = usePathname();

  return useMutation({
    mutationFn: ({ tweetId }: { tweetId: string }) =>
      graphqlClient.request(likeTweetMutation, { tweetId }),
    onSuccess: (variables, params) =>
      queryClient.invalidateQueries({ queryKey: ["liked-by", params.tweetId] }),
    onMutate: async (variables) => {
      if (path.includes("tweet")) {
        await queryClient.cancelQueries({
          queryKey: ["tweet-engagement", variables.tweetId],
        });

        const previousTweetEngagement = queryClient.getQueryData([
          "tweet-engagement",
          variables.tweetId,
        ]);

        queryClient.setQueryData(
          ["tweet-engagement", variables.tweetId],
          (prev: any) => {
            if (!prev.getTweet.tweetEngagement) {
              return {
                getTweet: {
                  tweetEngagement: {
                    likesCount: 1,
                    isTweetLikedBySessionUser: true,
                  },
                },
              };
            }
            return {
              getTweet: {
                tweetEngagement: {
                  likesCount: prev?.getTweet?.tweetEngagement.likesCount + 1,
                  isTweetLikedBySessionUser: true,
                },
              },
            };
          }
        );
        return previousTweetEngagement;
      }

      const { setIsTweetLikedBySessionUser, setLikesCount } = fns;
      setIsTweetLikedBySessionUser(true);
      setLikesCount((x) => x + 1);
    },
    onError: (err, params, context: any) => {
      if (path.includes("tweet")) {
        queryClient.setQueryData(
          ["tweet-engagement", params.tweetId],
          context.previousTweetEngagement
        );
        return;
      }

      const { setIsTweetLikedBySessionUser, setLikesCount } = fns;
      setIsTweetLikedBySessionUser(false);
      setLikesCount((x) => x - 1);
    },
  });
};

export const useDislikeTweet = (fns: OptimisticUpdaters) => {
  const path = usePathname();

  return useMutation({
    mutationFn: ({ tweetId }: { tweetId: string }) =>
      graphqlClient.request(dislikeTweetMutation, { tweetId }),
    onSuccess: (variables, params) =>
      queryClient.invalidateQueries({ queryKey: ["liked-by", params.tweetId] }),
    onMutate: async (variables) => {
      if (path.includes("tweet")) {
        await queryClient.cancelQueries({
          queryKey: ["tweet-engagement", variables.tweetId],
        });

        const previousTweetEngagement = queryClient.getQueryData([
          "tweet-engagement",
          variables.tweetId,
        ]);

        queryClient.setQueryData(
          ["tweet-engagement", variables.tweetId],
          (prev: any) => {
            return {
              getTweet: {
                tweetEngagement: {
                  likesCount: prev?.getTweet?.tweetEngagement.likesCount - 1,
                  isTweetLikedBySessionUser: false,
                },
              },
            };
          }
        );
        return previousTweetEngagement;
      }

      const { setIsTweetLikedBySessionUser, setLikesCount } = fns;
      setIsTweetLikedBySessionUser(false);
      setLikesCount((x) => x - 1);
    },
    onError: (err, params, context: any) => {
      if (path.includes("tweet")) {
        queryClient.setQueryData(
          ["tweet-engagement", params.tweetId],
          context.previousTweetEngagement
        );
        return;
      }

      const { setIsTweetLikedBySessionUser, setLikesCount } = fns;
      setIsTweetLikedBySessionUser(true);
      setLikesCount((x) => x + 1);
    },
  });
};
