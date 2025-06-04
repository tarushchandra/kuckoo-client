import { getPaginatedUserTweetsQuery } from "@/graphql/queries/tweet";
import { graphqlClient } from "@/lib/clients/graphql";
import { getSignedURLforUploadingImage } from "@/services/tweet";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const handleSelectAndUploadImage = (
  setImageURL: (str: string) => void
) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");

  input.addEventListener("change", async () => {
    const file = input.files?.item(0);
    if (!file) return;

    toast.loading("Uploading...", { id: "upload" });

    const PUTSignedURL = await getSignedURLforUploadingImage({
      imageName: file.name.split(".")[0],
      imageType: file.type.split("/")[1],
    });
    if (!PUTSignedURL) return;

    await fetch(PUTSignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    const PUTSignedURLObject = new URL(PUTSignedURL);
    const { origin, pathname } = PUTSignedURLObject;
    const GETUrl = origin + pathname;

    setImageURL(GETUrl);
    toast.success("Uploaded", { id: "upload" });
  });

  input.click();
};

// export const fetchUserTweets = async (
//   userId: string,
//   limit: number,
//   cursor?: string
// ) => {
//   const { getPaginatedTweets } = await graphqlClient.request(
//     getPaginatedUserTweetsQuery,
//     {
//       userId,
//       limit,
//       cursor,
//     }
//   );
//   return getPaginatedTweets;
// };

export const fetchUserTweets = async (
  userId: string,
  limit: number,
  cursor?: string
) => {
  const { getPaginatedTweets } = await graphqlClient.request(
    getPaginatedUserTweetsQuery,
    {
      userId,
      limit,
      cursor,
    }
  );
  return getPaginatedTweets;
};

// export const useInfiniteUserTweets = (userId: string, limit: number) => {
//   const [userTweets, setUserTweets] = useState<any[] | undefined>(undefined);
//   const [nextCursor, setNextCursor] = useState<string | undefined | null>(
//     undefined
//   );
//   const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(true);
//   const lastTweetRef = useRef<any>(null);

//   // fetching user tweets
//   useEffect(() => {
//     if (nextCursor === null || !hasNextPage) return;

//     const fetchTweets = async () => {
//       setIsFetchingNextPage(true);
//       const fetchedPaginatedTweets = await fetchUserTweets(
//         userId,
//         limit,
//         nextCursor
//       );
//       setIsFetchingNextPage(false);

//       setUserTweets((prev) => {
//         if (!prev) return fetchedPaginatedTweets.tweets;
//         return [...prev, ...fetchedPaginatedTweets.tweets];
//       });
//       setNextCursor(fetchedPaginatedTweets?.nextCursor);
//       setHasNextPage(false);
//     };

//     fetchTweets();
//   }, [hasNextPage]);

//   // observering last tweet
//   useEffect(() => {
//     if (!lastTweetRef.current) return;

//     const observer = new IntersectionObserver((entries) => {
//       const entry = entries[0];
//       if (entry.isIntersecting) {
//         if (nextCursor) setHasNextPage(true);
//         observer.unobserve(lastTweetRef.current);
//       }
//     });
//     observer.observe(lastTweetRef.current);

//     return () => {
//       if (lastTweetRef.current) observer.unobserve(lastTweetRef.current);
//     };
//   }, [userTweets]);

//   return {
//     userTweets,
//     isFetchingNextPage,
//     lastTweetRef,
//   };
// };
