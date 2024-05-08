// "use client";
import Comment from "@/components/comment";
import DeleteTweetModal from "@/components/delete-tweet-modal";
import EditOrDeleteTweetButtons from "@/components/edit-delete-tweet-buttons";
import Header from "@/components/header";
import MutualTweetLikers from "@/components/mutual-tweet-likers";
import PostTweetModal, { MODE } from "@/components/post-tweet-modal";
import SocialButtons from "@/components/social-buttons";
import TweetEngagement from "@/components/tweet-engagement";
import { Tweet } from "@/gql/graphql";
import { useAuth } from "@/hooks/auth";
import { useTweet } from "@/hooks/queries/tweet";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import { getTweet } from "@/services/tweet";
import dayjs from "dayjs";
import { ArrowLeft, FilePenLine, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TweetPageProps {
  params: {
    tweetId: string;
  };
}

export default async function TweetPage(props: TweetPageProps) {
  const { params } = props;
  const { tweetId } = params;

  const tweet = await getTweet(tweetId);
  // console.log("tweet -", tweet);

  const { author, content, imageURL, createdAt, tweetEngagement } = tweet;
  const { firstName, lastName, username, profileImageURL } = author;

  const tweetCreatedAt = dayjs(Number(createdAt));
  const formattedDate = tweetCreatedAt.format("MMMM D, YYYY");
  const formattedTime = tweetCreatedAt.utcOffset();

  //   console.log("formattedTime -", formattedTime);

  return (
    <>
      <Header className="p-4 flex gap-2 items-center">
        <ArrowLeft size={20} />
        <h1 className="text-xl font-semibold">{firstName}'s Tweet</h1>
      </Header>
      <div>
        <div className="px-4 pt-4 pb-2 flex flex-col gap-3 ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Link href={`/profile/${username}`}>
                <Image
                  src={profileImageURL!}
                  alt="user-image"
                  className="rounded-full transition-all hover:opacity-90"
                  width={45}
                  height={45}
                />
              </Link>
              <div className="flex flex-col gap-0">
                <Link
                  href={`/profile/${username}`}
                  className="font-semibold hover:underline"
                >
                  {firstName} {lastName}
                </Link>
                <h2 className="text-sm text-zinc-500">@{username}</h2>
              </div>
            </div>
            <EditOrDeleteTweetButtons author={tweet.author} tweet={tweet} />
          </div>
          <p className="text-md">{content}</p>
          {imageURL && (
            <Image
              src={imageURL!}
              alt="tweet-image"
              className="rounded-xl w-full h-full border border-zinc-800 object-cover"
              width={640}
              height={360}
            />
          )}
          <div className="flex justify-between items-center">
            <MutualTweetLikers tweetId={tweet.id} />
            <h2 className="text-sm text-zinc-500">{formattedDate}</h2>
          </div>
          <TweetEngagement tweet={tweet} />
          {/* <div className="border-t border-zinc-800 pt-2">
            <TweetEngagement
              tweet={{ id: tweetId } as Tweet}
              tweetEngagement={tweetEngagement!}
            />
          </div> */}
        </div>
        {/* {isCommentSectionOpen && (
          <div className="px-4 pt-4 border-t border-zinc-800">
            <div className="pb-2 flex gap-2 items-start border-b border-zinc-800">
              <Image
                src={sessionUser?.profileImageURL!}
                alt="session-user-image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <textarea
                name="tweet-input"
                id="tweet-input"
                rows={3}
                cols={50}
                className="bg-black text-sm focus:outline-none  my-[0.34rem] border-b border-b-zinc-800"
                placeholder={`Add a comment`}
              />
              <button className="bg-[#1D9BF0] font-xs font-semibold text-white rounded-full px-4 py-1">
                Post
              </button>
            </div>

            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        )} */}
      </div>
    </>
  );
}

// export default function TweetPage(props: TweetPageProps) {
//   const { params } = props;
//   const { tweetId } = params;
//   const tweet = useTweet(tweetId);
//   const { data: sessionUser } = useAuth(selectUser);

//   const [isDeleteTweetModalOpen, setIsDeleteTweetModalOpen] = useState(false);
//   const [isEditTweetModalOpen, setIsEditTweetModalOpen] = useState(false);

//   const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(true);

//   if (!tweet) return <h1>Loading...</h1>;

//   const { author, content, imageURL, createdAt, tweetEngagement } = tweet;
//   if (!author) return;
//   const { firstName, lastName, username, profileImageURL } = author;

//   const tweetCreatedAt = dayjs(Number(createdAt));
//   const formattedDate = tweetCreatedAt.format("MMMM D, YYYY");
//   const formattedTime = tweetCreatedAt.utcOffset();

//   //   console.log("formattedTime -", formattedTime);
//   console.log("tweet -", tweet);

//   return (
//     <>
//       <Header className="p-4 flex gap-2 items-center">
//         <ArrowLeft size={20} />
//         <h1 className="text-xl font-semibold">{firstName}'s Tweet</h1>
//       </Header>
//       <div>
//         <div className="px-4 pt-4 pb-2 flex flex-col gap-2 ">
//           <div className="flex justify-between items-center">
//             <div className="flex gap-2 items-center">
//               <Link href={`/profile/${username}`}>
//                 <Image
//                   src={profileImageURL!}
//                   alt="user-image"
//                   className="rounded-full transition-all hover:opacity-90"
//                   width={45}
//                   height={45}
//                 />
//               </Link>
//               <div className="flex flex-col gap-0">
//                 <Link
//                   href={`/profile/${username}`}
//                   className="font-semibold hover:underline"
//                 >
//                   {firstName} {lastName}
//                 </Link>
//                 <h2 className="text-sm text-zinc-500">@{username}</h2>
//               </div>
//             </div>
//             <>
//               {sessionUser?.username === author.username ? (
//                 <div className="flex gap-1">
//                   <div
//                     className="bg-white text-black p-1 rounded-full transition-all cursor-pointer hover:bg-zinc-200"
//                     title="Edit this tweet"
//                     onClick={() => setIsEditTweetModalOpen(true)}
//                   >
//                     <FilePenLine size={15} />
//                   </div>
//                   <div
//                     className="bg-red-700 p-1 rounded-full transition-all cursor-pointer hover:bg-red-800"
//                     title="Delete this tweet?"
//                     onClick={() => setIsDeleteTweetModalOpen(true)}
//                   >
//                     <Trash2 size={15} className="transition-all text-white" />
//                   </div>
//                 </div>
//               ) : (
//                 <SocialButtons
//                   targetUser={author as any}
//                   className="px-3 py-2 text-sm"
//                 />
//               )}
//             </>
//           </div>
//           <p className="text-md">{content}</p>
//           <Image
//             src={imageURL!}
//             alt="tweet-image"
//             className="rounded-xl w-full h-full border border-zinc-800 object-cover"
//             width={640}
//             height={360}
//           />
//           <div className="flex justify-between items-center">
//             <h2 className="text-sm font-semibold text-zinc-500 hover:underline cursor-pointer">
//               None of your followings liked this tweet
//             </h2>
//             <h2 className="text-sm text-zinc-500">{formattedDate}</h2>
//           </div>
//           <div className="border-t border-zinc-800 pt-2">
//             <TweetEngagement
//               tweet={{ id: tweetId } as Tweet}
//               tweetEngagement={tweetEngagement!}
//               isCommentSectionOpen={isCommentSectionOpen}
//               setIsCommentSectionOpen={setIsCommentSectionOpen}
//             />
//           </div>
//         </div>
//         {isCommentSectionOpen && (
//           <div className="px-4 pt-4 border-t border-zinc-800">
//             <div className="pb-2 flex gap-2 items-start border-b border-zinc-800">
//               <Image
//                 src={sessionUser?.profileImageURL!}
//                 alt="session-user-image"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <textarea
//                 name="tweet-input"
//                 id="tweet-input"
//                 rows={3}
//                 cols={50}
//                 className="bg-black text-sm focus:outline-none  my-[0.34rem] border-b border-b-zinc-800"
//                 placeholder={`Add a comment`}
//               />
//               <button className="bg-[#1D9BF0] font-xs font-semibold text-white rounded-full px-4 py-1">
//                 Post
//               </button>
//             </div>

//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//           </div>
//         )}
//       </div>

//       {isEditTweetModalOpen && (
//         <PostTweetModal
//           mode={MODE.EDIT_TWEET}
//           onClose={() => setIsEditTweetModalOpen(false)}
//           tweet={tweet as any}
//         />
//       )}

//       {isDeleteTweetModalOpen && (
//         <DeleteTweetModal
//           tweetId={tweetId}
//           setIsDeleteTweetModalOpen={setIsDeleteTweetModalOpen}
//         />
//       )}
//     </>
//   );
// }
