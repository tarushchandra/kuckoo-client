import React from "react";
import { BsTwitter } from "react-icons/bs";

const AppLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BsTwitter className="text-8xl animate-bounce" />
    </div>
  );
};

export default AppLoading;
