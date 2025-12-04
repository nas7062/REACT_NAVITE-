import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Feed from "./Feed";
import { colors } from "@/constants";
import { useInfinitePosts } from "@/hooks/useInfinityPosts";
import { useScrollToTop } from "@react-navigation/native";

function FeedList() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfinitePosts();
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const topRef = useRef<FlatList | null>(null);

  useScrollToTop(topRef);

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
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
