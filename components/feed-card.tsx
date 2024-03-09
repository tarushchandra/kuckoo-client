import Image from "next/image";
import React from "react";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BiRepost, BiStats } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";

const postButtons = [
  {
    id: 1,
    Icon: AiOutlineComment,
    color: "[#1D9BF0]",
  },
  {
    id: 2,
    Icon: BiRepost,
    color: "[#1D9BF0]",
  },
  {
    id: 3,
    Icon: AiOutlineHeart,
    color: "red-600",
  },
  {
    id: 4,
    Icon: BiStats,
    color: "#1D9BF0",
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
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>@chandra_tarush</span>
            <div className="bg-gray-500 w-1 h-1 rounded-full" />
            <span>14h</span>
          </div>
        </div>
        <p className="text-sm">
          🚀🖥️ Learning coding is an incredible adventure! 💻🌟 It's like
          solving puzzles every day, and the satisfaction of making your ideas
          come to life is unbeatable. 💡👏 Join the coding journey and discover
          the joy of endless creativity! 🤩👩‍💻👨‍💻
        </p>
        <div className="text-lg text-gray-500 flex justify-between pt-3">
          {postButtons.map((btn) => {
            return (
              <div
                key={btn.id}
                className={`flex gap-2 items-center  hover:text-${btn.color}`}
              >
                {<btn.Icon />}
                <h1 className="text-xs">13.3K</h1>
              </div>
            );
          })}
          <BsUpload />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
