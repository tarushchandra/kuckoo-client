import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

const postButtons = [
  {
    id: 1,
    Icon: Heart,
    title: "Like",
  },
  {
    id: 2,
    Icon: MessageCircle,
    title: "Comment",
  },
  {
    id: 3,
    Icon: Send,
    title: "Share",
  },
];

const FeedCard: React.FC = () => {
  return (
    <div className="flex items-start gap-3 cursor-pointer border-y border-t-0 border-zinc-700 transition-all p-3 hover:bg-zinc-900">
      <Image
        src={
          "https://media.licdn.com/dms/image/D5603AQEk1fpG7DDoCQ/profile-displayphoto-shrink_200_200/0/1702640584592?e=1714003200&v=beta&t=iuxdS8pY7FTUnu6Fo8GZios3L1tigP40X2WRC0Mz8Zo"
        }
        alt="user-image"
        className="rounded-full"
        width={45}
        height={45}
      />
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold">Tarush Chandra</h1>
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <span>@chandra_tarush</span>
            <div className="bg-zinc-500 w-1 h-1 rounded-full" />
            <span>14h</span>
          </div>
        </div>
        <p className="text-sm">
          🚀🖥️ Learning coding is an incredible adventure! 💻🌟 It's like
          solving puzzles every day, and the satisfaction of making your ideas
          come to life is unbeatable. 💡👏 Join the coding journey and discover
          the joy of endless creativity! 🤩👩‍💻👨‍💻
        </p>
        {/* <div className="flex gap-2 text-gray-300">
          <h1 className="text-sm font-bold">130 Likes</h1>
          <h1 className="text-sm font-bold">227 Comments</h1>
        </div> */}
        <div className="text-zinc-500 flex justify-between px-10 pt-1">
          {postButtons.map((btn) => {
            return (
              <div
                key={btn.id}
                className={`flex gap-1 justify-center items-center`}
              >
                <span>{<btn.Icon size={17} />}</span>
                <h1 className="text-xs">126</h1>
              </div>
            );
          })}
          <Bookmark size={17} />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
