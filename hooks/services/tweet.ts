import { getSignedURLforUploadingImage } from "@/services/tweet";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSelectAndUploadImage = () => {
  const [uploadedImageURL, setUploadedImageURL] = useState("");

  return {
    uploadedImageURL,
    setUploadedImageURL,
    handleSelectAndUploadImage,
  };
};

const handleSelectAndUploadImage = (
  setUploadedImageURL: (str: string) => void
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

    setUploadedImageURL(GETUrl);
    toast.success("Uploaded", { id: "upload" });
  });

  input.click();
};
