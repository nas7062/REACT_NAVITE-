import Comment from "@/components/Comment";
import Feed from "@/components/Feed";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useCreateComment } from "@/hooks/useCreateComment";
import { useGetComment } from "@/hooks/useGetComment";
import { useGetPostById } from "@/hooks/useGetPostById";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const scrollRef = useRef<ScrollView | null>(null);

  const onSubmit = async () => {
    if (!content || !profile || !post) return;
    mutate({
      content,
      docId: post.docId,
      profile,
    });
    setContent("");
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    if (!comments || comments.length === 0) return;

    scrollRef.current.scrollToEnd({ animated: true });
  }, [comments]);

  if (isPending || commentPending) return "loading...";
  if (!post || isError || commentError) return;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.awareScrollView}
        behavior="height"
        keyboardVerticalOffset={100}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={{ marginTop: 12 }}>
            <Feed post={post} isDetail />
            <Text style={styles.commnetCount}>댓글{comments.length || 0}</Text>
          </View>
          {comments?.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              postDocId={post.docId}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
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
