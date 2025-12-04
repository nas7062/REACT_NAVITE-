import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/post";
import { CreatePostDto } from "@/types";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ docId, body }: { docId: string; body: CreatePostDto }) =>
      updatePost({ docId, body }),
    onSuccess: (docId) => {
      queryClient.invalidateQueries({ queryKey: ["post", docId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
