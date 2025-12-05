import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateComment } from "@/api/comment";

export function useCreateComment(docId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", docId],
      });
    },
  });
}
