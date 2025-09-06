// import Link from "next/link";
// import { User } from "@/gql/graphql";
// import { useTotalFollowers, useTotalFollowings } from "@/hooks/queries/user";
// import Skeleton from "./ui/skeleton";
// import { getTotalFollowers, getTotalFollowings } from "@/services/user";

// export default async function MyFollows({ targetUser }: { targetUser: User }) {
//   const totalFollowers = await getTotalFollowers(targetUser.username);
//   const totalFollowings = await getTotalFollowings(targetUser.username);

//   if (totalFollowers === undefined && totalFollowings === undefined)
//     return <Skeleton className="w-40 h-5" />;

//   return (
//     <div className="text-zinc-500 text-sm flex gap-2">
//       <Link href={`/profile/${targetUser.username}/followers`}>
//         <h3>
//           <span className="font-bold text-white">{totalFollowers}</span>{" "}
//           Followers
//         </h3>
//       </Link>
//       <Link href={`/profile/${targetUser.username}/followings`}>
//         <h3 className="cursor-pointer">
//           <span className="font-bold text-white">{totalFollowings}</span>{" "}
//           Followings
//         </h3>
//       </Link>
//     </div>
//   );
// }
