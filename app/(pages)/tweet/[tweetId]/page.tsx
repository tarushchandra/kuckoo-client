import TweetComments from "@/components/tweet-comments";
import EditOrDeleteTweetButtons from "@/components/edit-delete-tweet-buttons";
import Header from "@/components/header";
import TweetEngagement, {
  TweetEngagementForModal,
} from "@/components/tweet-engagement";
import { getTweet } from "@/services/tweet";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TweetLikes from "@/components/tweet-likes";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface TweetPageProps {
  params: {
    tweetId: string;
  };
}

export default async function TweetPage(props: TweetPageProps) {
  const { params } = props;
  const { tweetId } = params;

  const tweet = await getTweet(tweetId);
  // console.log("tweet -", tweet);

  const { author, content, imageURL, createdAt, updatedAt } = tweet;
  const { firstName, lastName, username, profileImageURL } = author;

  const tweetCreatedAt = dayjs(Number(createdAt));
  const tweetUpdatedAt = dayjs(Number(updatedAt));
  const formattedCreatedDate = tweetCreatedAt.format("MMMM D, YYYY");
  const formattedCreatedTime = tweetCreatedAt.format("h:mm A");
  const formattedUpdatedDate = tweetUpdatedAt.format("MMMM D, YYYY");
  const formattedUpdatedTime = tweetUpdatedAt.format("h:mm A");
  const formattedCreatedDateFromNow = tweetCreatedAt.fromNow();

  // console.log("tweet page");

  return (
    <>
      <Header className="p-4">
        <h1 className="text-xl font-semibold">{firstName}&apos;s Tweet</h1>
      </Header>
      <div className="px-4 pt-4 pb-2 flex flex-col gap-3 ">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link href={`/profile/${username}`}>
              <Image
                src={profileImageURL!}
                alt="user-image"
                className="rounded-full transition-all hover:opacity-90"
                width={45}
                height={45}
              />
            </Link>
            <div className="flex flex-col gap-0">
              <Link
                href={`/profile/${username}`}
                className="font-semibold hover:underline"
              >
                {firstName} {lastName}
              </Link>
              <h2 className="text-sm text-zinc-500">@{username}</h2>
            </div>
          </div>
          <EditOrDeleteTweetButtons author={tweet.author} tweet={tweet} />
        </div>
        <p className="text-md">{content}</p>
        {imageURL && (
          <Image
            src={imageURL!}
            alt="tweet-image"
            className="rounded-xl w-full h-full border border-zinc-800 object-cover"
            width={640}
            height={360}
          />
        )}
        <>
          {tweet.createdAt === tweet.updatedAt ? (
            <div className="flex justify-between items-center">
              <TweetLikes tweetId={tweetId} />
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <h2>{formattedCreatedDate}</h2>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 text-sm text-zinc-500 font-semibold">
                <h2>
                  Created - {formattedCreatedDate} at {formattedCreatedTime}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                  <h2>
                    Edited - {formattedUpdatedDate} at {formattedUpdatedTime}
                  </h2>
                </div>
              </div>
              <TweetLikes tweetId={tweetId} />
            </div>
          )}
        </>
        <TweetEngagementForModal
          tweet={{ ...tweet, createdAt: formattedCreatedDateFromNow }}
        />
      </div>
      <TweetComments
        tweet={{ ...tweet, createdAt: formattedCreatedDateFromNow }}
      />
    </>
  );
}
