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
  console.log("intercepted tweet page");
  console.log("intercepted tweet page props -", props);

  const tweet = await getTweet(props.params.tweetId);
  return <TweetModal tweet={tweet} />;
}
