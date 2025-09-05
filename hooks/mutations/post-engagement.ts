import { PostEngagement } from "@/gql/graphql";
import {
  createBookmarkMutation,
  createCommentMutation,
  createCommentReplyMutation,
  deleteCommentMutation,
  dislikeCommentMutation,
  dislikePostMutation,
  editCommentMutation,
  likeCommentMutation,
  likePostMutation,
  removeBookmarkMutation,
} from "@/graphql/mutations/post-engagement";
import { graphqlClient } from "@/lib/clients/graphql";
import { queryClient } from "@/lib/clients/react-query";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface OptimisticUpdaters {
  setIsPostLikedBySessionUser: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const useLikePost = (fns?: OptimisticUpdaters) => {
  const path = usePathname();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      graphqlClient.request(likePostMutation, { postId }),
    onSuccess: (variables, params) =>
      queryClient.invalidateQueries({ queryKey: ["liked-by", params.postId] }),
    onMutate: async (variables) => {
      if (!fns) {
        await queryClient.cancelQueries({
          queryKey: ["post-engagement", variables.postId],
        });

        const previousPostEngagement = queryClient.getQueryData([
          "post-engagement",
          variables.postId,
        ]);

        queryClient.setQueryData(
          ["post-engagement", variables.postId],
          (prev: any) => {
            if (!prev.getPost.postEngagement) {
              return {
                getPost: {
                  postEngagement: {
                    likesCount: 1,
                    isPostLikedBySessionUser: true,
                  },
                },
              };
            }
            return {
              getPost: {
                postEngagement: {
                  ...prev.getPost.postEngagement,
                  likesCount: prev?.getPost?.postEngagement.likesCount + 1,
                  isPostLikedBySessionUser: true,
                },
              },
            };
          }
        );
        return { previousPostEngagement };
      }

      const { setIsPostLikedBySessionUser, setLikesCount } = fns;
      setIsPostLikedBySessionUser(true);
      setLikesCount((x) => x + 1);
    },
    onError: (err, params, context: any) => {
      if (!fns) {
        queryClient.setQueryData(
          ["post-engagement", params.postId],
          context.previousPostEngagement
        );
        return;
      }

      const { setIsPostLikedBySessionUser, setLikesCount } = fns;
      setIsPostLikedBySessionUser(false);
      setLikesCount((x) => x - 1);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-engagement", variables.postId],
      });
    },
  });
};

export const useDislikePost = (fns?: OptimisticUpdaters) => {
  const path = usePathname();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      graphqlClient.request(dislikePostMutation, { postId }),
    onSuccess: (data, params) =>
      queryClient.invalidateQueries({ queryKey: ["liked-by", params.postId] }),
    onMutate: async (variables) => {
      if (!fns) {
        await queryClient.cancelQueries({
          queryKey: ["post-engagement", variables.postId],
        });

        const previousPostEngagement = queryClient.getQueryData([
          "post-engagement",
          variables.postId,
        ]);

        queryClient.setQueryData(
          ["post-engagement", variables.postId],
          (prev: any) => {
            return {
              getPost: {
                postEngagement: {
                  ...prev.getPost.postEngagement,
                  likesCount: prev?.getPost?.postEngagement.likesCount - 1,
                  isPostLikedBySessionUser: false,
                },
              },
            };
          }
        );
        return { previousPostEngagement };
      }

      const { setIsPostLikedBySessionUser, setLikesCount } = fns;
      setIsPostLikedBySessionUser(false);
      setLikesCount((x) => x - 1);
    },
    onError: (err, params, context: any) => {
      if (!fns) {
        queryClient.setQueryData(
          ["post-engagement", params.postId],
          context.previousPostEngagement
        );
        return;
      }

      const { setIsPostLikedBySessionUser, setLikesCount } = fns;
      setIsPostLikedBySessionUser(true);
      setLikesCount((x) => x + 1);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-engagement", variables.postId],
      });
    },
  });
};

// -----------------------------------------------------------------------------------

interface useCreateCommentParams {
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
  setTextContent: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}

export const useCreateComment = (updaters: useCreateCommentParams) => {
  const { setTextContent, onCommentMutation } = updaters;

  return useMutation({
    mutationFn: (variables: any) =>
      graphqlClient.request(createCommentMutation, {
        postId: variables.id,
        content: variables.content,
      }),
    onSuccess: () => onCommentMutation?.onSuccess(),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["post-comments", payload.id],
      });
      await queryClient.cancelQueries({
        queryKey: ["post-engagement", payload.id],
      });

      const previousPostComments: any = queryClient.getQueryData([
        "post-comments",
        payload.id,
      ]);
      if (
        !previousPostComments ||
        !previousPostComments.getPost.postEngagement
      ) {
        return;
      }

      const previousPostCommentsCount = queryClient.getQueryData([
        "post-engagement",
        payload.id,
      ]);

      queryClient.setQueryData(["post-comments", payload.id], (prev: any) => ({
        getPost: {
          postEngagement: {
            comments: [payload, ...prev.getPost.postEngagement.comments],
          },
        },
      }));
      setTextContent("");

      queryClient.setQueryData(
        ["post-engagement", payload.id],
        (prev: any) => ({
          getPost: {
            postEngagement: {
              ...prev.getPost.postEngagement,
              commentsCount: prev.getPost.postEngagement.commentsCount + 1,
            },
          },
        })
      );

      return { previousPostComments, previousPostCommentsCount };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(
        ["post-comments", variables.id],
        context.previousPostComments
      );
      queryClient.setQueryData(
        ["post-engagement", variables.id],
        context.previousPostCommentsCount
      );
      setTextContent(variables.content);
      onCommentMutation?.onError();
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-comments", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-engagement", variables.id],
      });
      setTextContent("");
    },
  });
};

export const useEditComment = (onClose: () => void) => {
  return useMutation({
    mutationFn: (variables: {
      commentId: string;
      content: string;
      postId: string;
      parentCommentId: string;
    }) =>
      graphqlClient.request(editCommentMutation, {
        commentId: variables.commentId,
        content: variables.content,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-comments", variables.postId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "comment-replies",
          variables.parentCommentId
            ? variables.parentCommentId
            : variables.postId,
        ],
      });

      toast.success("Comment updated");
      onClose();
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (variables: {
      postId: string;
      commentId: string;
      parentCommentId: string;
    }) =>
      graphqlClient.request(deleteCommentMutation, {
        postId: variables.postId,
        commentId: variables.commentId,
      }),
    onSuccess: async (_, variables) => {
      console.log("variables -", variables);

      await queryClient.setQueryData(
        ["post-engagement", variables.postId],
        (prev: any) => ({
          getPost: {
            postEngagement: {
              ...prev.getPost.postEngagement,
              commentsCount: prev.getPost.postEngagement.commentsCount - 1,
            },
          },
        })
      );

      if (!variables.parentCommentId)
        await queryClient.invalidateQueries({
          queryKey: ["post-comments", variables.postId],
        });

      await queryClient.invalidateQueries({
        queryKey: [
          "comment-replies",
          variables.parentCommentId
            ? variables.parentCommentId
            : variables.commentId,
        ],
      });
      toast.success("Comment deleted");
    },
  });
};

interface CommentOptimisticUpdaters {
  like: () => void;
  dislike: () => void;
}

export const useLikeComment = (updaterFns: CommentOptimisticUpdaters) => {
  const { like, dislike } = updaterFns;

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) =>
      graphqlClient.request(likeCommentMutation, { commentId }),
    onMutate: () => like(),
    onError: () => dislike(),
  });
};

export const useDislikeComment = (updaterFns: CommentOptimisticUpdaters) => {
  const { like, dislike } = updaterFns;

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) =>
      graphqlClient.request(dislikeCommentMutation, { commentId }),
    onMutate: () => dislike(),
    onError: () => like(),
  });
};

export const useCreateCommentReply = ({
  onClose,
  onCommentMutation,
}: {
  onClose?: () => void;
  onCommentMutation?: { onSuccess: () => void; onError: () => void };
}) => {
  return useMutation({
    mutationFn: (variables: {
      postId: string;
      commentId: string;
      content: string;
      parentCommentId: string;
    }) =>
      graphqlClient.request(createCommentReplyMutation, {
        postId: variables.postId,
        commentId: variables.commentId,
        content: variables.content,
      }),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          "comment-replies",
          variables.parentCommentId
            ? variables.parentCommentId
            : variables.commentId,
        ],
      });

      await queryClient.setQueryData(
        ["post-engagement", variables.postId],
        (prev: any) => ({
          getPost: {
            postEngagement: {
              ...prev.getPost.postEngagement,
              commentsCount: prev.getPost.postEngagement.commentsCount + 1,
            },
          },
        })
      );

      onClose && onClose();
      onCommentMutation && onCommentMutation.onSuccess();
      toast.success("Replied successfully!");
    },
  });
};

// -------------------------------------------------------------

interface bookmarksOptimisticUpdaters {
  createBookmark: () => void;
  removeBookmark: () => void;
}

export const useCreateBookmark = (fns?: bookmarksOptimisticUpdaters) => {
  return useMutation({
    mutationFn: (variables: { postId: string }) =>
      graphqlClient.request(createBookmarkMutation, {
        postId: variables.postId,
      }),
    onMutate: async (variables) => {
      if (!fns) {
        await queryClient.cancelQueries({
          queryKey: ["post-engagement", variables.postId],
        });

        const previousPostEngagement = queryClient.getQueryData([
          "post-engagement",
          variables.postId,
        ]);

        queryClient.setQueryData(
          ["post-engagement", variables.postId],
          (prev: any) => {
            if (!prev.getPost.postEngagement) {
              return {
                getPost: {
                  postEngagement: {
                    isPostBookmarkedBySessionUser: true,
                  },
                },
              };
            }

            return {
              getPost: {
                postEngagement: {
                  ...prev.getPost.postEngagement,
                  isPostBookmarkedBySessionUser: true,
                },
              },
            };
          }
        );
        return { previousPostEngagement };
      }

      fns?.createBookmark();
    },
    onError: (err, params, context: any) => {
      if (!fns) {
        queryClient.setQueryData(
          ["post-engagement", params.postId],
          context.previousPostEngagement
        );
        return;
      }

      fns?.removeBookmark();
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-engagement", variables.postId],
      });
    },
  });
};

export const useRemoveBookmark = (fns?: bookmarksOptimisticUpdaters) => {
  return useMutation({
    mutationFn: (variables: { postId: string }) =>
      graphqlClient.request(removeBookmarkMutation, {
        postId: variables.postId,
      }),
    onMutate: async (variables) => {
      if (!fns) {
        await queryClient.cancelQueries({
          queryKey: ["post-engagement", variables.postId],
        });

        const previousPostEngagement = queryClient.getQueryData([
          "post-engagement",
          variables.postId,
        ]);

        queryClient.setQueryData(
          ["post-engagement", variables.postId],
          (prev: any) => {
            if (!prev.getPost.postEngagement) {
              return {
                getPost: {
                  postEngagement: {
                    isPostBookmarkedBySessionUser: false,
                  },
                },
              };
            }
            return {
              getPost: {
                postEngagement: {
                  ...prev.getPost.postEngagement,
                  isPostBookmarkedBySessionUser: false,
                },
              },
            };
          }
        );

        return { previousPostEngagement };
      }
      fns?.removeBookmark();
    },
    onError: (err, params, context: any) => {
      if (!fns) {
        queryClient.setQueryData(
          ["post-engagement", params.postId],
          context.previousPostEngagement
        );
        return;
      }
      fns?.createBookmark();
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post-engagement", variables.postId],
      });
    },
  });
};
