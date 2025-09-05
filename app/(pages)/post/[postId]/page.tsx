import PostComments from "@/components/post-comments";
import EditOrDeletePostButtons from "@/components/edit-delete-post-buttons";
import Header from "@/components/header";
import PostEngagement, {
  PostEngagementForModal,
} from "@/components/post-engagement";
import { getPost } from "@/services/post";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PostLikes from "@/components/post-likes";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostPageProps {
  params: {
    postId: string;
  };
}

export default async function PostPage(props: PostPageProps) {
  const { params } = props;
  const { postId } = params;

  const post = await getPost(postId);
  // console.log("post -", post);

  const { author, content, imageURL, createdAt, updatedAt } = post;
  const { firstName, lastName, username, profileImageURL } = author;

  const postCreatedAt = dayjs(Number(createdAt));
  const postUpdatedAt = dayjs(Number(updatedAt));
  const formattedCreatedDate = postCreatedAt.format("MMMM D, YYYY");
  const formattedCreatedTime = postCreatedAt.format("h:mm A");
  const formattedUpdatedDate = postUpdatedAt.format("MMMM D, YYYY");
  const formattedUpdatedTime = postUpdatedAt.format("h:mm A");
  const formattedCreatedDateFromNow = postCreatedAt.fromNow();

  // console.log("post page");

  return (
    <>
      <Header className="p-4">
        <h1 className="text-xl font-semibold">{firstName}&apos;s Post</h1>
      </Header>
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
          <EditOrDeletePostButtons author={post.author} post={post} />
        </div>
        <p className="text-md">{content}</p>
        {imageURL && (
          <Image
            src={imageURL!}
            alt="post-image"
            className="rounded-xl w-full h-full border border-zinc-800 object-cover"
            width={640}
            height={360}
          />
        )}
        <>
          {post.createdAt === post.updatedAt ? (
            <div className="flex justify-between items-center">
              <PostLikes postId={postId} />
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <h2>{formattedCreatedDate}</h2>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 text-sm text-zinc-500 font-semibold">
                <h2>
                  Created - {formattedCreatedDate} at {formattedCreatedTime}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-500 w-1 h-1 rounded-full" />
                  <h2>
                    Edited - {formattedUpdatedDate} at {formattedUpdatedTime}
                  </h2>
                </div>
              </div>
              <PostLikes postId={postId} />
            </div>
          )}
        </>
        <PostEngagementForModal
          post={{ ...post, createdAt: formattedCreatedDateFromNow }}
        />
      </div>
      <PostComments
        post={{ ...post, createdAt: formattedCreatedDateFromNow }}
      />
    </>
  );
}
