import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useGetComment } from "@/hooks/useGetComment";
import { useToggleLike } from "@/hooks/useToggleLike";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Profile from "./Profile";
dayjs.extend(relativeTime);
dayjs.locale("ko");
interface FeedProps {
  post: Post;
  isDetail?: boolean;
}

function Feed({ post, isDetail = false }: FeedProps) {
  const { user } = useAuth();

  const isLiked = post.likes.includes(user?.uid as string);
  const { showActionSheetWithOptions } = useActionSheet();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: toggleLike } = useToggleLike(post.docId, user?.uid as string);

  const {
    data: comments,
    isPending: commentPending,
    isError: commentError,
  } = useGetComment(post.docId);

  const onToggle = () => {
    toggleLike(isLiked);
  };

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 0;
    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deletePost(post.docId, {
              onSuccess: () => isDetail && router.back(),
            });
            break;
          case 1: // 수정
            router.push({
              pathname: "/post/update/[id]",
              params: { id: post.docId },
            });
            break;
          case cancelButtonIndex:
            break;
        }
      }
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      router.push({
        pathname: "/post/[id]",
        params: { id: post.docId },
      });
    }
  };

  const ContainerComponent = isDetail ? View : Pressable;

  if (commentPending) return "loading...";
  if (commentError || !comments) return;
  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <Profile
          imageUri={post.author.imageUri}
          nickname={post.author.displayName}
          createdAt={dayjs(post.createdAt).fromNow()}
          onPress={() => {}}
          option={
            user?.uid === post.author.id && (
              <Ionicons
                name="ellipsis-horizontal"
                size={20}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.descript}>
          {post.description}
        </Text>
        <View style={styles.subContainer}>
          <Text style={styles.sub}>조회 {post.viewCount}</Text>
          <Text style={styles.comments}>댓글 {comments.length}</Text>
          <Text style={styles.sub}>찜 {post.likes.length}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/rabbit.png")}
          style={styles.image}
        />
        <Pressable style={styles.likeButton} onPress={onToggle}>
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={24}
            color={colors.ORANGE_600}
          />
        </Pressable>
      </View>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    padding: 8,
    height: 160,
    gap: 10,
  },

  contentContainer: {
    justifyContent: "space-around",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  descript: {
    fontSize: 12,
    color: colors.GRAY_700,
  },
  comments: {
    fontSize: 10,
    color: colors.GRAY_700,
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
