import {
  getPaginatedPostsFeedQuery,
  getPaginatedUserPostsQuery,
  getPostQuery,
} from "@/graphql/queries/post";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useIntersection } from "../utils";

export const useInfiniteUserPosts = (userId: string, limit: number) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["user-posts", userId],
      queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
        graphqlClient.request(getPaginatedUserPostsQuery, {
          userId,
          limit,
          cursor: pageParam,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.getPaginatedPosts.nextCursor,
    });
  const { observe, isIntersecting } = useIntersection();

  const userPosts = useMemo(
    () => data?.pages.flatMap((x) => x.getPaginatedPosts.posts),
    [data?.pages.length]
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage]);

  return {
    userPosts,
    isFetchingNextPage,
    observe,
  };
};

export const useInfinitePostsFeed = (limit: number) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts-feed"],
      queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
        graphqlClient.request(getPaginatedPostsFeedQuery, {
          limit,
          cursor: pageParam,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.getPaginatedPostsFeed.nextCursor,
    });
  const { observe, isIntersecting } = useIntersection();

  const postsFeed = useMemo(
    () => data?.pages.flatMap((x) => x.getPaginatedPostsFeed.posts),
    [data?.pages.length]
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage]);

  return {
    postsFeed,
    isFetchingNextPage,
    observe,
  };
};

export const usePost = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => graphqlClient.request(getPostQuery, { postId }),
  });

  return data?.getPost;
};
