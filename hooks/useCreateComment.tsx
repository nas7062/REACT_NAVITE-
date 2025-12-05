import { QueryClient, useMutation } from "@tanstack/react-query";
import { CreateComment } from "@/api/comment";

export function useCreateComment() {
  const queryclient = new QueryClient();
  return useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
