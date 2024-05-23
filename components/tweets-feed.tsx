import { useAuth } from "@/hooks/auth";
import { useTweetsFeed } from "@/hooks/queries/tweet";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import Tweets from "./tweets";

export default function TweetsFeed() {
  const { data: sessionUser } = useAuth(selectUser);
  const tweets = useTweetsFeed(sessionUser?.username!);

  return <Tweets tweets={tweets!} />;
}
