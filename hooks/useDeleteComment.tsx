import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/api/comment";
export function useDeleteComment(postDocId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentDocId,
      commentId,
    }: {
      commentDocId: string;
      commentId: number;
    }) =>
      deleteComment({
        postDocId,
        commentDocId,
        commentId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postDocId] });
    },
  });
}
