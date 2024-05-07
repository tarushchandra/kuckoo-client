import {
  dislikeTweetMutation,
  likeTweetMutation,
} from "@/graphql/mutations/tweet-engagement";
import { graphqlClient } from "@/lib/clients/graphql";
import { useMutation } from "@tanstack/react-query";

interface OptimisticUpdaters {
  setIsTweetLikedBySessionUser: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
}

export const useLikeTweet = (fns: OptimisticUpdaters) => {
  const { setIsTweetLikedBySessionUser, setLikesCount } = fns;

  return useMutation({
    mutationFn: ({ tweetId }: { tweetId: string }) =>
      graphqlClient.request(likeTweetMutation, { tweetId }),
    onMutate: () => {
      setIsTweetLikedBySessionUser(true);
      setLikesCount((x) => x + 1);
    },
    onError: () => {
      setIsTweetLikedBySessionUser(false);
      setLikesCount((x) => x - 1);
    },
  });
};

export const useDislikeTweet = (fns: OptimisticUpdaters) => {
  const { setIsTweetLikedBySessionUser, setLikesCount } = fns;

  return useMutation({
    mutationFn: ({ tweetId }: { tweetId: string }) =>
      graphqlClient.request(dislikeTweetMutation, { tweetId }),
    onMutate: () => {
      setIsTweetLikedBySessionUser(false);
      setLikesCount((x) => x - 1);
    },
    onError: () => {
      setIsTweetLikedBySessionUser(true);
      setLikesCount((x) => x + 1);
    },
  });
};
