import { TweetEngagement } from "@/gql/graphql";
import {
  createCommentMutation,
  deleteCommentMutation,
  dislikeTweetMutation,
  editCommentMutation,
  likeTweetMutation,
} from "@/graphql/mutations/tweet-engagement";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface OptimisticUpdaters {
  setIsTweetLikedBySessionUser: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
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
        return { previousTweetEngagement };
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
    onSuccess: (data, params) =>
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
        return { previousTweetEngagement };
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

interface useCreateCommentParams {
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
  setTextContent: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}

export const useCreateComment = (updaters: useCreateCommentParams) => {
  const { setTextContent, onCommentMutation } = updaters;

  return useMutation({
    mutationFn: (variables: any) =>
      graphqlClient.request(createCommentMutation, {
        tweetId: variables.id,
        content: variables.content,
      }),
    onSuccess: () => onCommentMutation?.onSuccess(),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["tweet-comments", payload.id],
      });
      await queryClient.cancelQueries({
        queryKey: ["tweet-engagement", payload.id],
      });

      const previousTweetComments: any = queryClient.getQueryData([
        "tweet-comments",
        payload.id,
      ]);
      if (
        !previousTweetComments ||
        !previousTweetComments.getTweet.tweetEngagement
      ) {
        return;
      }

      const previousTweetCommentsCount = queryClient.getQueryData([
        "tweet-engagement",
        payload.id,
      ]);

      queryClient.setQueryData(["tweet-comments", payload.id], (prev: any) => ({
        getTweet: {
          tweetEngagement: {
            comments: [payload, ...prev.getTweet.tweetEngagement.comments],
          },
        },
      }));
      setTextContent("");

      queryClient.setQueryData(
        ["tweet-engagement", payload.id],
        (prev: any) => ({
          getTweet: {
            tweetEngagement: {
              ...prev.getTweet.tweetEngagement,
              commentsCount: prev.getTweet.tweetEngagement.commentsCount + 1,
            },
          },
        })
      );

      return { previousTweetComments, previousTweetCommentsCount };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(
        ["tweet-comments", variables.id],
        context.previousTweetComments
      );
      queryClient.setQueryData(
        ["tweet-engagement", variables.id],
        context.previousTweetCommentsCount
      );
      setTextContent(variables.content);
      onCommentMutation?.onError();
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tweet-comments", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["tweet-engagement", variables.id],
      });
      setTextContent("");
    },
  });
};

export const useEditComment = (onClose: () => void) => {
  return useMutation({
    mutationFn: (variables: {
      commentId: string;
      content: string;
      tweetId: string;
    }) =>
      graphqlClient.request(editCommentMutation, {
        commentId: variables.commentId,
        content: variables.content,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tweet-comments", variables.tweetId],
      });
      toast.success("Comment updated");
      onClose();
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (variables: { tweetId: string; commentId: string }) =>
      graphqlClient.request(deleteCommentMutation, {
        tweetId: variables.tweetId,
        commentId: variables.commentId,
      }),
    onSuccess: async (_, variables) => {
      console.log("variables -", variables);

      await queryClient.invalidateQueries({
        queryKey: ["tweet-comments", variables.tweetId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["tweet-engagement", variables.tweetId],
      });
      toast.success("Comment deleted");
    },
  });
};
