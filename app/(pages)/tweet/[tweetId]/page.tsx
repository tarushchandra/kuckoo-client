import TweetComments from "@/components/tweet-comments";
import EditOrDeleteTweetButtons from "@/components/edit-delete-tweet-buttons";
import Header from "@/components/header";
import TweetEngagement from "@/components/tweet-engagement";
import { getTweet } from "@/services/tweet";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Likes from "@/components/tweet-likes";
import TweetLikes from "@/components/tweet-likes";

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

  const { author, content, imageURL, createdAt, tweetEngagement } = tweet;
  const { firstName, lastName, username, profileImageURL } = author;

  const tweetCreatedAt = dayjs(Number(createdAt));
  const formattedDate = tweetCreatedAt.format("MMMM D, YYYY");

  return (
    <>
      <Header className="p-4 flex gap-2 items-center">
        <ArrowLeft size={20} />
        <h1 className="text-xl font-semibold">{firstName}'s Tweet</h1>
      </Header>
      <div>
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
          <div className="flex justify-between items-center">
            <TweetLikes tweetId={tweet.id} />
            <h2 className="text-sm text-zinc-500">{formattedDate}</h2>
          </div>
          <TweetEngagement tweet={tweet} />
        </div>
        <TweetComments />
      </div>
    </>
  );
}
