import React from "react";
import { FaEarlybirds } from "react-icons/fa";

const AppLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaEarlybirds className="text-8xl animate-bounce" />
    </div>
  );
};

export default AppLoading;
