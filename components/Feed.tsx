import { colors } from "@/constants";
import { Post } from "@/types";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface FeedProps {
  post: Post;
}

function Feed({ post }: FeedProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.descript}>{post.description}</Text>
        <View style={styles.subContainer}>
          <Text style={styles.name}>{post.author ? post.author : ""}</Text>
          <Text style={styles.sub}>조회 {post.viewCount}</Text>
          <Text style={styles.sub}>찜 {post.voteCount}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/rabbit.png")}
          style={styles.image}
        />
        <Pressable style={styles.likeButton}>
          <Octicons name="heart-fill" size={24} color={colors.ORANGE_600} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    padding: 10,
    height: 160,
    gap: 10,
  },

  contentContainer: {
    justifyContent: "space-around",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  descript: {
    fontSize: 12,
    color: colors.GRAY_700,
  },
  name: {
    fontWeight: "bold",
    fontSize: 10,
  },
  sub: {
    fontSize: 10,
    color: colors.GRAY_700,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  likeButton: {
    position: "absolute",
    bottom: 8,
    right: 20,
    padding: 6,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 16,
  },
});

export default Feed;
