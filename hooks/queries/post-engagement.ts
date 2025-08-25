import {
  getBookmarksQuery,
  getCommentsOfCommentQuery,
  getDetailedLikedByQuery,
  getLikedByQuery,
  getRepliedToCommentQuery,
  getPostCommentsQuery,
  getPostEngagementQuery,
} from "@/graphql/queries/post-engagement";
import { graphqlClient } from "@/lib/clients/graphql";
import { useQuery } from "@tanstack/react-query";

export const usePostEngagement = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["post-engagement", postId],
    queryFn: () => graphqlClient.request(getPostEngagementQuery, { postId }),
  });
  return data?.getPost?.postEngagement;
};

export const usePostsLikedBy = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["liked-by", postId],
    queryFn: () => graphqlClient.request(getLikedByQuery, { postId }),
  });
  return data?.getPostEngagement;
};

export const useDetailedPostsLikedBy = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["detailed-liked-by", postId],
    queryFn: () => graphqlClient.request(getDetailedLikedByQuery, { postId }),
  });
  return data?.getPostEngagement?.likes;
};

export const usePostComments = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => graphqlClient.request(getPostCommentsQuery, { postId }),
  });
  return data?.getPost?.postEngagement;
};

export const useCommentReplies = (commentId: string) => {
  const { data } = useQuery({
    queryKey: ["comment-replies", commentId],
    queryFn: () =>
      graphqlClient.request(getCommentsOfCommentQuery, { commentId }),
  });
  return data?.getCommentsOfComment;
};

export const useRepliedToComment = (commentId: string, postId: string) => {
  const { data } = useQuery({
    queryKey: ["replied-to-comment", postId, commentId],
    queryFn: () =>
      graphqlClient.request(getRepliedToCommentQuery, { postId, commentId }),
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
