import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useGetLikePosts } from "@/hooks/useGetLikePosts";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Feed from "./Feed";

function LikeFeedList() {
  const { user } = useAuth();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetLikePosts(user?.uid as string);
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const topRef = useRef<FlatList | null>(null);

  // Temporarily disabled to test if this causes the crash
  // useScrollToTop(topRef);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={topRef}
      data={posts}
      renderItem={({ item }) => <Feed post={item} />}
      keyExtractor={(item) => item.docId ?? `${String(item.id)}-like`}
      contentContainerStyle={styles.contentContainer}
      removeClippedSubviews={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>좋아요한 글이 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    alignItems: "center",
  },
});

export default LikeFeedList;
