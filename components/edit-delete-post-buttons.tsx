"use client";

import { useAuth } from "@/hooks/auth";
import { selectUser } from "@/lib/redux/features/auth/authSlice";
import SocialButtons from "./social-buttons";
import { Post, User } from "@/gql/graphql";
import { FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
import PostPostModal, { MODE } from "./create-post-modal";
import DeletePostModal from "./delete-post-modal";

interface EditOrDeletePostButtonsProps {
  author: User;
  post: Post;
}

export default function EditOrDeletePostButtons(
  props: EditOrDeletePostButtonsProps
) {
  const { author, post } = props;
  const { data: sessionUser } = useAuth(selectUser);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);

  if (sessionUser?.username !== author.username)
    return <SocialButtons targetUser={author} className="px-3 py-2 text-sm" />;

  return (
    <>
      <div className="flex gap-1">
        <div
          className="bg-zinc-200 text-black p-1 rounded-full transition-all cursor-pointer hover:bg-zinc-200"
          title="Edit this post"
          onClick={() => setIsEditPostModalOpen(true)}
        >
          <FilePenLine size={15} />
        </div>
        <div
          className="bg-red-700 p-1 rounded-full transition-all cursor-pointer hover:bg-red-800"
          title="Delete this post?"
          onClick={() => setIsDeletePostModalOpen(true)}
        >
          <Trash2 size={15} className="transition-all text-zinc-200" />
        </div>
      </div>

      {isEditPostModalOpen && (
        <PostPostModal
          mode={MODE.EDIT_POST}
          onClose={() => setIsEditPostModalOpen(false)}
          post={post}
        />
      )}

      {isDeletePostModalOpen && (
        <DeletePostModal
          postId={post.id}
          setIsDeletePostModalOpen={setIsDeletePostModalOpen}
        />
      )}
    </>
  );
}
