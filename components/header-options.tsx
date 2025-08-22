"use client";
import mergeClasses from "@/utils/mergeClasses";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function HeaderOptions({ username }: { username: string }) {
  const pathName = usePathname();

  if (pathName.includes("followings") || pathName.includes("followers")) {
    const [option, setOption] = useState<number | null>(null);

    useLayoutEffect(() => {
      if (pathName.includes("followers")) setOption(0);
      if (pathName.includes("followings")) setOption(1);
    }, [pathName]);

    return (
      <div className="flex text-sm text-zinc-500 font-semibold justify-around">
        <Link
          href={`/profile/${username}/followers`}
          className={mergeClasses(
            "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
            option === 0 && "border-b text-white"
          )}
        >
          Followers
        </Link>
        <Link
          href={`/profile/${username}/followings`}
          className={mergeClasses(
            "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
            option === 1 && "border-b text-white"
          )}
        >
          Followings
        </Link>
      </div>
    );
  }

  if (pathName.includes("explore")) {
    const [option, setOption] = useState<number | null>(null);

    useLayoutEffect(() => {
      if (pathName.includes("suggestions")) setOption(0);
      if (pathName.includes("all-users")) setOption(1);
    }, [pathName]);

    return (
      <div className="flex text-sm text-zinc-500 font-semibold justify-around">
        <Link
          href={`/explore/suggestions`}
          className={mergeClasses(
            "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
            option === 0 && "border-b text-white"
          )}
        >
          Suggestions for you
        </Link>
        <Link
          href={`/explore/all-users`}
          className={mergeClasses(
            "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
            option === 1 && "border-b text-white"
          )}
        >
          All Users
        </Link>
      </div>
    );
  }
}
