import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/post";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (DocId: string) => deletePost(DocId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
