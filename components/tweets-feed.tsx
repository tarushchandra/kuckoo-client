import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import Tweets from "./tweets";
import { useInfiniteTweetsFeed } from "@/hooks/queries/tweet";

export default function TweetsFeed() {
  const { data: sessionUser } = useAuth(selectUser);
  const { tweetsFeed, isFetchingNextPage, observe } = useInfiniteTweetsFeed(
    sessionUser?.id!,
    4
  );

  return (
    <Tweets
      tweets={tweetsFeed!}
      isFetchingNextPage={isFetchingNextPage}
      observe={observe}
    />
  );
}
