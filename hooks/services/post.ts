import { getPaginatedUserPostsQuery } from "@/graphql/queries/post";
import { graphqlClient } from "@/lib/clients/graphql";
import { getSignedURLforUploadingImage } from "@/services/post";
import toast from "react-hot-toast";

export const handleSelectAndUploadImage = (
  setImageURL: (str: string) => void,
  setImagePathname: (str: string) => void
) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");

  input.addEventListener("change", async () => {
    const file = input.files?.item(0);
    if (!file) throw new Error("Please select a valid file to upload");

    toast.loading("Uploading...", { id: "upload" });

    const PUTSignedURL = await getSignedURLforUploadingImage({
      imageName: file.name.split(".")[0],
      imageType: file.type.split("/")[1],
    });
    if (!PUTSignedURL) throw new Error("Could not get the signed URL");

    await fetch(PUTSignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    setImageURL(URL.createObjectURL(file));
    setImagePathname(new URL(PUTSignedURL).pathname);
    toast.success("Uploaded", { id: "upload" });
  });

  input.click();
};

export const fetchUserPosts = async (
  userId: string,
  limit: number,
  cursor?: string
) => {
  const { getPaginatedPosts } = await graphqlClient.request(
    getPaginatedUserPostsQuery,
    {
      userId,
      limit,
      cursor,
    }
  );
  return getPaginatedPosts;
};
