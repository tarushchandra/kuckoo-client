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
    onMutate: () => toast.loading("Please wait...", { id: "create-tweet" }),
    onSuccess: () => {
      toast.success("Tweet created", { id: "create-tweet" });
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
    onMutate: () => toast.loading("Please wait...", { id: "delete-tweet" }),
    onSuccess: () => {
      toast.success("Tweet deleted", { id: "delete-tweet" });
      queryClient.invalidateQueries({
        queryKey: ["tweets", sessionUsername],
      });
    },
  });
};

export const useUpdateTweet = (sessionUsername: string) => {
  return useMutation({
    mutationFn: ({
      tweetId,
      payload,
    }: {
      tweetId: string;
      payload: TweetInput;
    }) =>
      graphqlClient.request(updateTweetMutation, {
        tweetId,
        payload,
      }),
    onMutate: () => toast.loading("Please wait...", { id: "update-tweet" }),
    onSuccess: () => {
      toast.success("Tweet updated", { id: "update-tweet" });
      queryClient.invalidateQueries({
        queryKey: ["tweets", sessionUsername],
      });
    },
  });
};
