import { ImageUploadInput } from "@/gql/graphql";
import {
  getSignedURLForUploadingImageQuery,
  getTweetQuery,
} from "@/graphql/queries/tweet";
import { graphqlClient, graphqlEndPoint } from "@/lib/clients/graphql";
import { print } from "graphql";

export const getSignedURLforUploadingImage = async (
  payload: ImageUploadInput
) => {
  const response = await graphqlClient.request(
    getSignedURLForUploadingImageQuery,
    {
      payload,
    }
  );
  return response.getSignedURLForUploadingImage;
};

export const getTweet = async (tweetId: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(getTweetQuery),
      variables: { tweetId },
    }),
    next: {
      tags: [`/tweet/${tweetId}`],
    },
    cache: "no-store",
  });
  const data = await response.json();
  return data.data.getTweet;
};
