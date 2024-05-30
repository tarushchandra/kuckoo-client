"use client";
import Header from "@/components/header";
import Tweets from "@/components/tweets";
import { useBookmarks } from "@/hooks/queries/tweet-engagement";
import React from "react";

export default function BookmarksPage() {
  const bookmarkedTweets = useBookmarks();

  return (
    <>
      <Header className="p-4 text-xl font-semibold">Bookmarks</Header>
      <Tweets tweets={bookmarkedTweets!} />
    </>
  );
}
