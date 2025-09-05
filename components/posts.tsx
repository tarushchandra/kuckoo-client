"use client";
import React from "react";
import PostCard from "./post-card";
import PostCardLoading from "./ui/post-card-loading";

interface PostsProps {
  posts: any[] | undefined;
  observe: (node: Element) => void;
  isFetchingNextPage: boolean;
}

export default function Posts(props: PostsProps) {
  const { posts, isFetchingNextPage, observe } = props;

  console.log("posts -", posts);

  if (!posts)
    return Array.from({ length: 4 }, (_, index) => (
      <PostCardLoading key={index} />
    ));

  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map((post: any, index) => (
            <PostCard
              key={post.id}
              post={post}
              ref={index === posts.length - 1 ? observe : null}
            />
          ))}
          {isFetchingNextPage && (
            <h2 className="text-zinc-500 animate-pulse text-center my-2">
              Loading...
            </h2>
          )}
        </>
      ) : (
        <h1 className="text-center mt-2">No Posts yet</h1>
      )}
    </div>
  );
}
