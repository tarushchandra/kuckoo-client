import Tweets from "./tweets";
import { useInfiniteTweetsFeed } from "@/hooks/queries/tweet";

export default function TweetsFeed() {
  const { tweetsFeed, isFetchingNextPage, observe } = useInfiniteTweetsFeed(4);

  return (
    <Tweets
      tweets={tweetsFeed!}
      isFetchingNextPage={isFetchingNextPage}
      observe={observe}
    />
  );
}
