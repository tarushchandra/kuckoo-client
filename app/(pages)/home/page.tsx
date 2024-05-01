"use client";
import Header from "@/components/header";
import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useCreateTweet } from "@/hooks/mutations/tweet";
import {
  getSignedURLforAccessingImage,
  getSignedURLforUploadingImage,
} from "@/services/tweet";
import toast from "react-hot-toast";
import Skeleton from "@/components/ui/skeleton";

export default function HomePage() {
  const { data: sessionUser } = useAuth(selectUser);
  const createTweetMutation = useCreateTweet(sessionUser?.username!);
  const [textContent, setTextContent] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleSelectImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.addEventListener("change", async () => {
      const file = input.files?.item(0);
      if (!file) return;

      setIsImageUploading(true);

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
      toast.success("Uploaded");

      const PUTSignedURLObject = new URL(PUTSignedURL);
      const { origin, pathname } = PUTSignedURLObject;
      const GETUrl = origin + pathname;

      setUploadedImageURL(GETUrl);
      setIsImageUploading(false);
    });

    input.click();
  };

  const handleCreateTweet = async () => {
    await createTweetMutation.mutateAsync({
      content: textContent,
      imageURL: uploadedImageURL,
    });
    setTextContent("");
    setUploadedImageURL("");
  };

  return (
    <>
      <Header className="p-4 text-xl font-semibold">Home</Header>
      <div className="px-4 py-2 flex gap-3 border-b border-b-zinc-800">
        <div>
          <Image
            src={sessionUser?.profileImageURL!}
            alt="session-user-image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            name="tweet-input"
            id="tweet-input"
            rows={4}
            cols={37}
            className="bg-black w-full text-xl focus:outline-none my-[0.34rem] border-b border-b-zinc-800"
            placeholder={`What's on your mind, ${sessionUser?.firstName}?`}
            onChange={(e) => setTextContent(e.target.value)}
            value={textContent}
          />
          <>
            {isImageUploading ? (
              <Skeleton className="w-full h-80 rounded-lg" />
            ) : (
              uploadedImageURL && (
                <div className="w-full h-80">
                  <Image
                    src={uploadedImageURL}
                    alt="uploaded-image"
                    className="rounded-lg w-full h-full object-cover"
                    width={600}
                    height={600}
                  />
                </div>
              )
            )}
          </>
          <div className="flex justify-between items-center py-1">
            <div className="rounded-full cursor-pointer p-[0.4rem] transition-all hover:bg-[#051f30]">
              <ImageIcon
                className="text-[#1D9BF0]"
                size={20}
                onClick={handleSelectImage}
              />
            </div>
            <button
              onClick={handleCreateTweet}
              disabled={createTweetMutation.isPending}
              className="bg-[#1D9BF0] text-sm font-bold text-white cursor-pointer px-4 py-2 transition-all rounded-full active:scale-[0.95] disabled:cursor-wait"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
