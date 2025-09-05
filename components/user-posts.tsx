"use client";
import { getPaginatedUserPostsQuery } from "@/graphql/queries/post";
import Posts from "./posts";
import { User } from "@/gql/graphql";
// import { useInfiniteUserPosts } from "@/hooks/services/post";
import { graphqlClient } from "@/lib/clients/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteUserPosts } from "@/hooks/queries/post";

export default function UserPosts({ user }: { user: User }) {
  const { userPosts, isFetchingNextPage, observe } = useInfiniteUserPosts(
    user.id,
    2
  );

  const modifiedPosts = userPosts?.map((post: any) => ({
    ...post,
    author: user,
  }));

  return (
    <Posts
      posts={modifiedPosts!}
      observe={observe}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
