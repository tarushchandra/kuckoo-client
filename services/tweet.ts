import { ImageUploadInput } from "@/gql/graphql";
import {
  getSignedURLForUploadingImageQuery,
  getSignedURLForAccessingImageQuery,
} from "@/graphql/queries/tweet";
import { graphqlClient } from "@/lib/clients/graphql";

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

export const getSignedURLforAccessingImage = async (key: string) => {
  const response = await graphqlClient.request(
    getSignedURLForAccessingImageQuery,
    { key }
  );
  return response.getSignedURLForAccessingImage;
};
