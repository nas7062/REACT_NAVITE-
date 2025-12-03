import { MOCK_POSTS } from "@/data/Mock";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Feed from "./Feed";
import { colors } from "@/constants";

function FeedList() {
  return (
    <FlatList
      data={MOCK_POSTS}
      renderItem={({ item }) => <Feed post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
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
