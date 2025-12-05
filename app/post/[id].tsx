import Feed from "@/components/Feed";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { useGetPostById } from "@/hooks/useGetPostById";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPostById(id as string);

  if (isPending) return "loading...";
  if (!post || isError) return;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.awareScrollView}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={{ marginTop: 12 }}>
            <Feed post={post} isDetail />
            <Text style={styles.commnetCount}>댓글{post.commentCount}</Text>
          </View>
        </ScrollView>
        <View style={styles.commentInputContainer}>
          <InputField
            rightChild={
              <Pressable style={styles.inputButtonContainer}>
                <Text style={styles.inputButtonText}>등록</Text>
              </Pressable>
            }
          />
        </View>
      </KeyboardAwareScrollView>
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
    padding: 8,
    borderRadius: 6,
  },
  inputButtonText: {
    color: colors.WHITE,
  },
});
