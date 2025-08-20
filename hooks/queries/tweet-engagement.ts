import {
  getBookmarksQuery,
  getCommentsOfCommentQuery,
  getDetailedLikedByQuery,
  getLikedByQuery,
  getRepliedToCommentQuery,
  getTweetCommentsQuery,
  getTweetEngagementQuery,
} from "@/graphql/queries/tweet-engagement";
import { graphqlClient } from "@/lib/clients/graphql";
import { useQuery } from "@tanstack/react-query";

export const useTweetEngagement = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["tweet-engagement", tweetId],
    queryFn: () => graphqlClient.request(getTweetEngagementQuery, { tweetId }),
  });
  return data?.getTweet?.tweetEngagement;
};

export const useTweetsLikedBy = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["liked-by", tweetId],
    queryFn: () => graphqlClient.request(getLikedByQuery, { tweetId }),
  });
  return data?.getTweetEngagement;
};

export const useDetailedTweetsLikedBy = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["detailed-liked-by", tweetId],
    queryFn: () => graphqlClient.request(getDetailedLikedByQuery, { tweetId }),
  });
  return data?.getTweetEngagement?.likes;
};

export const useTweetComments = (tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["tweet-comments", tweetId],
    queryFn: () => graphqlClient.request(getTweetCommentsQuery, { tweetId }),
  });
  return data?.getTweet?.tweetEngagement;
};

export const useCommentReplies = (commentId: string) => {
  const { data } = useQuery({
    queryKey: ["comment-replies", commentId],
    queryFn: () =>
      graphqlClient.request(getCommentsOfCommentQuery, { commentId }),
  });
  return data?.getCommentsOfComment;
};

export const useRepliedToComment = (commentId: string, tweetId: string) => {
  const { data } = useQuery({
    queryKey: ["replied-to-comment", tweetId, commentId],
    queryFn: () =>
      graphqlClient.request(getRepliedToCommentQuery, { tweetId, commentId }),
  });
  return data?.getComment?.repliedTo;
};

// --------------------------------------------------------------

export const useBookmarks = () => {
  const { data } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => graphqlClient.request(getBookmarksQuery),
  });
  return data?.getBookmarks;
};
