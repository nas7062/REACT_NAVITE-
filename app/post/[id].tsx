import Comment from "@/components/Comment";
import Feed from "@/components/Feed";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useCreateComment } from "@/hooks/useCreateComment";
import { useGetComment } from "@/hooks/useGetComment";
import { useGetPostById } from "@/hooks/useGetPostById";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPostById(id as string);
  const { mutate } = useCreateComment(post?.docId);
  const {
    data: comments,
    isPending: commentPending,
    isError: commentError,
  } = useGetComment(id as string);
  const { profile } = useAuth();
  const [content, setContent] = useState("");
  if (isPending || commentPending) return "loading...";
  if (!post || isError || commentError) return;

  const onSubmit = async () => {
    if (!content || !profile) return;
    mutate(
      {
        content,
        docId: post.docId,
        profile,
      },
      {
        onSuccess: () => {
          setContent("");
        },
      }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.awareScrollView}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={{ marginTop: 12 }}>
            <Feed post={post} isDetail />
            <Text style={styles.commnetCount}>
              댓글{post.commentCount || 0}
            </Text>
          </View>
          {comments?.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              postDocId={post.docId}
            />
          ))}
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={styles.commentInputContainer}>
        <InputField
          value={content}
          autoFocus
          onSubmitEditing={onSubmit}
          placeholder="댓글을 남겨보세요"
          onChangeText={(value) => setContent(value)}
          rightChild={
            <Pressable style={styles.inputButtonContainer} onPress={onSubmit}>
              <Text style={styles.inputButtonText}>등록</Text>
            </Pressable>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  commnetCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
    paddingBottom: 72,
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    backgroundColor: colors.WHITE,
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "100%",
  },
  awareScrollView: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  inputButtonContainer: {
    backgroundColor: colors.PRIMARY,
    padding: 6,
    borderRadius: 8,
  },
  inputButtonText: {
    color: colors.WHITE,
  },
});
