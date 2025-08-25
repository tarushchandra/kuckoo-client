import { ImageUploadInput } from "@/gql/graphql";
import {
  getSignedURLForUploadingImageQuery,
  getPostQuery,
} from "@/graphql/queries/post";
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

export const getPost = async (postId: string) => {
  const response = await fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(getPostQuery),
      variables: { postId },
    }),
    next: {
      tags: [`/post/${postId}`],
    },
    cache: "no-store",
  });
  const data = await response.json();
  return data.data.getPost;
};
