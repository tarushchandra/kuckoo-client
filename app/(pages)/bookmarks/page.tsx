"use client";
import Header from "@/components/header";
import Posts from "@/components/posts";
import { useBookmarks } from "@/hooks/queries/post-engagement";
import React from "react";

export default function BookmarksPage() {
  const bookmarkedPosts = useBookmarks();

  return (
    <>
      <Header className="p-4 text-xl font-semibold">Bookmarks</Header>
      <Posts posts={bookmarkedPosts!} />
    </>
  );
}
