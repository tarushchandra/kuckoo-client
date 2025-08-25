import Posts from "./posts";
import { useInfinitePostsFeed } from "@/hooks/queries/post";

export default function PostsFeed() {
  const { postsFeed, isFetchingNextPage, observe } = useInfinitePostsFeed(4);

  return (
    <Posts
      posts={postsFeed!}
      isFetchingNextPage={isFetchingNextPage}
      observe={observe}
    />
  );
}
