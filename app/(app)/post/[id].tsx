import Comment from "@/components/Comment";
import Feed from "@/components/Feed";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useCreateComment } from "@/hooks/useCreateComment";
import { useGetComment } from "@/hooks/useGetComment";
import { useGetPostById } from "@/hooks/useGetPostById";
import useKeyboard from "@/hooks/usekeyboard";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
  const { isKeyboardVisible } = useKeyboard();
  const inset = useSafeAreaInsets(); // 밑에 공간 inset.bottom으로
  const inputRef = useRef<TextInput | null>(null);
  const [parentCommentId, setParentcommentId] = useState<number | null>(null);

  const handleRepple = (commentId: number) => {
    setParentcommentId(commentId);
    inputRef.current?.focus();
  };
  const handleCancleRepple = () => {
    setParentcommentId(null);
    Keyboard.dismiss();
  };
  const onSubmit = async () => {
    if (!content || !profile || !post) return;
    if (parentCommentId) {
      mutate({
        content,
        docId: post.docId,
        profile,
        parentId: parentCommentId,
      });
      setContent("");
      handleCancleRepple();
      return;
    }
    mutate({
      content,
      docId: post.docId,
      profile,
    });
    setContent("");
  };

  // 변경 시 스크롤 아래로 comments
  useEffect(() => {
    if (!scrollRef.current) return;
    if (!comments || comments.length === 0) return;

    scrollRef.current.scrollToEnd({ animated: true });
  }, [comments]);

  if (isPending || commentPending) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>loading...</Text>
      </SafeAreaView>
    );
  }

  if (!post || isError || commentError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>게시글을 불러오지 못했습니다.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container} key={id as string}>
      <KeyboardAvoidingView
        style={styles.awareScrollView}
        behavior="height"
        keyboardVerticalOffset={
          Platform.OS === "ios" || isKeyboardVisible ? 100 : inset.bottom
        }
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
            <React.Fragment key={comment.id}>
              <Comment
                comment={comment}
                postDocId={post.docId}
                parentCommentId={parentCommentId}
                onRepple={() => handleRepple(comment.id)}
                onCancle={handleCancleRepple}
              />
              {comment.replies.map((repple) => (
                <Comment
                  comment={repple}
                  postDocId={post.docId}
                  key={repple.id}
                  isReply
                />
              ))}
            </React.Fragment>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.commentInputContainer}>
        <InputField
          ref={inputRef}
          value={content}
          returnKeyType="send"
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
    paddingHorizontal: 16,
    paddingVertical: 20,
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
