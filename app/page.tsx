import { BsTwitter } from "react-icons/bs";
import React from "react";
import Link from "next/link";

const RootPage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-black to-[#081015]">
      <div className="flex justify-between items-center px-40 absolute w-full top-0">
        <div className="text-5xl w-fit p-4 rounded-full cursor-pointer active:scale-[0.95] transition-all">
          <BsTwitter />
        </div>
        <div className="flex gap-4 font-semibold">
          <button className="bg-black border border-zinc-700 px-4 py-2 rounded-lg text-md active:scale-[0.95] transition-all hover:bg-zinc-800">
            <Link href="/sign-in">Sign In</Link>
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg active:scale-[0.95] transition-all text-md hover:bg-zinc-300">
            <Link href="/sign-up">Sign Up</Link>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <h1 className="text-9xl font-semibold">
          New to <span className="bg-[#1D9BF0]  px-4 rounded-2xl">Twitter</span>
          ?
        </h1>
        <h1 className="text-6xl font-semibold">Join Today. ✌️</h1>
      </div>
    </div>
  );
};

export default RootPage;

// bg-[#1D9BF0]
