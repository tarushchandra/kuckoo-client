// "use client";
// import mergeClasses from "@/utils/mergeClasses";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useLayoutEffect, useState } from "react";

// export default function HeaderOptions({ username }: { username: string }) {
//   const pathName = usePathname();

//   if (pathName.includes("followings") || pathName.includes("followers")) {
//     const [option, setOption] = useState<number | null>(null);

//     useLayoutEffect(() => {
//       if (pathName.includes("followers")) setOption(0);
//       if (pathName.includes("followings")) setOption(1);
//     }, [pathName]);

//     return (
//       <div className="flex text-sm text-zinc-500 font-semibold justify-around">
//         <Link
//           href={`/profile/${username}/followers`}
//           className={mergeClasses(
//             "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
//             option === 0 && "border-b text-white"
//           )}
//         >
//           Followers
//         </Link>
//         <Link
//           href={`/profile/${username}/followings`}
//           className={mergeClasses(
//             "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
//             option === 1 && "border-b text-white"
//           )}
//         >
//           Followings
//         </Link>
//       </div>
//     );
//   }

//   if (pathName.includes("explore")) {
//     const [option, setOption] = useState<number | null>(null);

//     useLayoutEffect(() => {
//       if (pathName.includes("suggestions")) setOption(0);
//       if (pathName.includes("all-users")) setOption(1);
//     }, [pathName]);

//     return (
//       <div className="flex text-sm text-zinc-500 font-semibold justify-around">
//         <Link
//           href={`/explore/suggestions`}
//           className={mergeClasses(
//             "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
//             option === 0 && "border-b text-white"
//           )}
//         >
//           Suggestions for you
//         </Link>
//         <Link
//           href={`/explore/all-users`}
//           className={mergeClasses(
//             "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
//             option === 1 && "border-b text-white"
//           )}
//         >
//           All Users
//         </Link>
//       </div>
//     );
//   }
// }

"use client";
import mergeClasses from "@/utils/mergeClasses";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";

interface TabConfig {
  label: string;
  href: string;
  pathSegment: string;
}

interface HeaderSection {
  path: string;
  tabs: TabConfig[];
}

const HEADER_SECTIONS: HeaderSection[] = [
  {
    path: "followings",
    tabs: [
      { label: "Followers", href: "/followers", pathSegment: "followers" },
      { label: "Followings", href: "/followings", pathSegment: "followings" },
    ],
  },
  {
    path: "followers",
    tabs: [
      { label: "Followers", href: "/followers", pathSegment: "followers" },
      { label: "Followings", href: "/followings", pathSegment: "followings" },
    ],
  },
  {
    path: "explore",
    tabs: [
      {
        label: "Suggestions for you",
        href: "/explore/suggestions",
        pathSegment: "suggestions",
      },
      {
        label: "All Users",
        href: "/explore/all-users",
        pathSegment: "all-users",
      },
    ],
  },
];

export default function HeaderOptions({ username }: { username: string }) {
  const pathName = usePathname();
  const [activeOption, setActiveOption] = useState<number | null>(null);

  // Find the matching header section
  const currentSection = HEADER_SECTIONS.find((section) =>
    pathName.includes(section.path)
  );

  // Update active option based on current path
  useLayoutEffect(() => {
    if (!currentSection) {
      setActiveOption(null);
      return;
    }

    const activeIndex = currentSection.tabs.findIndex((tab) =>
      pathName.includes(tab.pathSegment)
    );

    setActiveOption(activeIndex >= 0 ? activeIndex : null);
  }, [pathName, currentSection]);

  // Function to render each tab
  const renderTab = useCallback(
    (tab: TabConfig, index: number) => {
      const href = tab.href.startsWith("/explore")
        ? tab.href
        : `/profile/${username}${tab.href}`;

      return (
        <Link
          key={tab.pathSegment}
          href={href}
          className={mergeClasses(
            "flex-1 cursor-pointer text-center py-3 hover:bg-zinc-900 border-primary",
            activeOption === index && "border-b text-white"
          )}
        >
          {tab.label}
        </Link>
      );
    },
    [activeOption, username]
  );

  // Don't render anything if no matching section found
  if (!currentSection) return null;

  return (
    <div className="flex text-sm text-zinc-500 font-semibold justify-around">
      {currentSection.tabs.map((tab, index) => renderTab(tab, index))}
    </div>
  );
}
