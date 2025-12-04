import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/api/post";

export function useGetPostById(docId: string | undefined) {
  return useQuery({
    queryKey: ["post", docId],
    queryFn: () => {
      if (!docId) throw new Error("useGetPostById Error");
      return getPostById(docId);
    },
    enabled: !!docId,
  });
}
