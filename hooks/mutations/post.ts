import { PostInput } from "@/gql/graphql";
import {
  createPostMutation,
  deletePostMutation,
  updatePostMutation,
} from "@/graphql/mutations/post";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreatePost = (sessionUsername: string) => {
  return useMutation({
    mutationFn: (variables: PostInput) =>
      graphqlClient.request(createPostMutation, { payload: variables }),
    onMutate: () => toast.loading("Please wait...", { id: "create-post" }),
    onSuccess: () => {
      toast.success("Post created", { id: "create-post" });
      queryClient.invalidateQueries({
        queryKey: ["posts", sessionUsername],
      });
    },
  });
};

export const useDeletePost = (sessionUsername: string) => {
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      graphqlClient.request(deletePostMutation, {
        postId,
      }),
    onMutate: () => toast.loading("Please wait...", { id: "delete-post" }),
    onSuccess: () => {
      toast.success("Post deleted", { id: "delete-post" });
      queryClient.invalidateQueries({
        queryKey: ["posts", sessionUsername],
      });
    },
  });
};

export const useUpdatePost = (sessionUsername: string) => {
  return useMutation({
    mutationFn: ({ postId, payload }: { postId: string; payload: PostInput }) =>
      graphqlClient.request(updatePostMutation, {
        postId,
        payload,
      }),
    onMutate: () => toast.loading("Please wait...", { id: "update-post" }),
    onSuccess: () => {
      toast.success("Post updated", { id: "update-post" });
      queryClient.invalidateQueries({
        queryKey: ["posts", sessionUsername],
      });
    },
  });
};
