import PostModal from "@/components/post-modal";
import { getPost } from "@/services/post";

interface InterceptedPostPageProps {
  params: {
    postId: string;
  };
}

export default async function InterceptedPostPage(
  props: InterceptedPostPageProps
) {
  const post = await getPost(props.params.postId);
  return <PostModal post={post} />;
}
