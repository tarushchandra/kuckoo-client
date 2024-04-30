import { TweetInput } from "@/gql/graphql";
import {
  createTweetMutation,
  deleteTweetMutation,
  updateTweetMutation,
} from "@/graphql/mutations/tweet";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateTweet = (sessionUsername: string) => {
  return useMutation({
    mutationFn: (variables: TweetInput) =>
      graphqlClient.request(createTweetMutation, { payload: variables }),
    onSuccess: () => {
      toast.success("Tweet created");
      queryClient.invalidateQueries({
        queryKey: ["tweets", sessionUsername],
      });
    },
  });
};

export const useDeleteTweet = (sessionUsername: string) => {
  return useMutation({
    mutationFn: ({ tweetId }: { tweetId: string }) =>
      graphqlClient.request(deleteTweetMutation, {
        tweetId,
      }),
    onSuccess: () => {
      toast.success("Tweet deleted");
      queryClient.invalidateQueries({
        queryKey: ["tweets", sessionUsername],
      });
    },
  });
};

export const useUpdateTweet = (sessionUsername: string) => {
  return useMutation({
    mutationFn: ({ tweetId, content }: { tweetId: string; content: string }) =>
      graphqlClient.request(updateTweetMutation, {
        tweetId,
        content,
      }),
    onSuccess: () => {
      toast.success("Tweet updated");
      queryClient.invalidateQueries({
        queryKey: ["tweets", sessionUsername],
      });
    },
  });
};
