import { toggleLike } from "@/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLike = (docId: string, userId: string) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: async (isLiked: boolean) => {
      const { toggle } = await toggleLike(docId, userId);
      await toggle(isLiked);
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["posts"] });
      queryclient.invalidateQueries({ queryKey: ["post", docId] });
    },
  });
};
