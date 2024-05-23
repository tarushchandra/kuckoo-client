import {
  getCommentsOfCommentQuery,
  getDetailedLikedByQuery,
  getLikedByQuery,
  getRepliedToComment,
  getTweetCommentsQuery,
  getTweetEngagementQuery,
} from "@/graphql/queries/tweet-engagement";
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
      queryClient.invalidateQueries({
        queryKey: ["tweet-engagement", tweetId],
      });
    };
  }, [tweetId]);

  return data?.getTweet?.tweetEngagement;
};

export const useTweetsLikedBy = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["liked-by", tweetId],
    queryFn: () => graphqlClient.request(getLikedByQuery, { tweetId }),
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["liked-by", tweetId] });
    };
  }, [tweetId]);

  return data?.getTweetEngagement;
};

export const useDetailedTweetsLikedBy = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["detailed-liked-by", tweetId],
    queryFn: () => graphqlClient.request(getDetailedLikedByQuery, { tweetId }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["detailed-liked-by", tweetId] });
    };
  }, [tweetId]);

  return data?.getTweetEngagement?.likes;
};

export const useTweetComments = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["tweet-comments", tweetId],
    queryFn: () => graphqlClient.request(getTweetCommentsQuery, { tweetId }),
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["tweet-comments", tweetId] });
    };
  }, [tweetId]);

  return data?.getTweet?.tweetEngagement;
};

export const useCommentReplies = (commentId: string) => {
  const { data } = useQuery({
    queryKey: ["comment-replies", commentId],
    queryFn: () =>
      graphqlClient.request(getCommentsOfCommentQuery, { commentId }),
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["comment-replies", commentId],
      });
    };
  }, [commentId]);

  return data?.getCommentsOfComment;
};

export const useRepliedToComment = (commentId: string, tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["replied-to-comment", tweetId, commentId],
    queryFn: () =>
      graphqlClient.request(getRepliedToComment, { tweetId, commentId }),
  });

  return data?.getComment?.repliedTo;
};
