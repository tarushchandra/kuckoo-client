"use client";
import Header from "@/components/header";

interface TweetPageProps {
  params: {
    tweetId: string;
  };
}

export default function TweetPage(props: TweetPageProps) {
  const { params } = props;
  const { tweetId } = params;

  return (
    <div>
      <Header className="px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold">Tarush Chandra</h1>
            <h2 className="text-sm text-zinc-500">@turboforce</h2>
          </div>
          <button className="bg-white text-black rounded-full px-4 py-2">
            Follow
          </button>
        </div>
      </Header>
    </div>
  );
}
