import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/api/comment";

export function useDeleteComment(postDocId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentDocId: string) =>
      deleteComment({ postDocId, commentDocId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postDocId] });
    },
  });
}
