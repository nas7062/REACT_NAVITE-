import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Feed from "./Feed";
import { colors } from "@/constants";
import { useInfinitePosts } from "@/hooks/useInfinityPosts";

function FeedList() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

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
      data={posts}
      renderItem={({ item }) => <Feed post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
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
