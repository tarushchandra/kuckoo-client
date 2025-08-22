import React from "react";
import LandingHeader from "@/components/landing-header";

const RootPage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-black to-[#122430]">
      <LandingHeader />
      <div className="flex-1 flex flex-col justify-center items-center xs1:gap-4 lg:gap-8">
        <h1 className="xs:text-[clamp(2rem,10vw,3rem)] xs1:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold">
          New to{" "}
          <span className="bg-primary-500 xs:px-1 xs:rounded-lg lg:px-4 lg:rounded-2xl">
            Coo
          </span>
          ?
        </h1>
        <h1 className="xs:text-[clamp(1rem,5vw,2rem)] xs1:text-3xl md:text-4xl lg:text-6xl font-semibold">
          Join Today. ✌️
        </h1>
      </div>
    </div>
  );
};

export default RootPage;
