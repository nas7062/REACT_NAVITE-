import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/post";

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }: { pageParam?: string }) => getPosts({ pageParam }),
    getNextPageParam: (lastPage: { nextCursor?: string }) =>
      lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });
}
