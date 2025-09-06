import mergeClasses from "@/utils/mergeClasses";
import Link from "next/link";
import { FaEarlybirds } from "react-icons/fa";

interface LandingHeaderProps {
  className?: string;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ className }) => {
  return (
    <div className={mergeClasses("w-full p-4", className)}>
      <div className="lg:max-w-7xl mx-auto flex justify-between items-center top-0">
        <div className="text-[2.5rem] w-fit rounded-full cursor-pointer active:scale-[0.95] transition-all">
          <Link href="/">
            <FaEarlybirds />
          </Link>
        </div>
        <div className="flex gap-4 font-semibold">
          <button className="bg-black border border-zinc-700 px-4 py-2 rounded-lg active:scale-[0.95] transition-all hover:bg-zinc-800">
            <Link className="xs:text-sm sm:text-md" href="/sign-in">
              Sign In
            </Link>
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg active:scale-[0.95] transition-all hover:bg-zinc-300">
            <Link className="xs:text-sm sm:text-md" href="/sign-up">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
