import TweetModal from "@/components/tweet-modal";
import { getTweet } from "@/services/tweet";

interface InterceptedTweetPageProps {
  params: {
    tweetId: string;
  };
}

export default async function InterceptedTweetPage(
  props: InterceptedTweetPageProps
) {
  const tweet = await getTweet(props.params.tweetId);
  return <TweetModal tweet={tweet} />;
}
