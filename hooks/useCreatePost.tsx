import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePost } from "@/api/post";
import { router } from "expo-router";

export function useCreatePost() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: CreatePost,
    onSuccess: () => {
      router.replace("/");
      queryclient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
