import { colors } from "@/constants";
import { Comment as IComment } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Profile from "./Profile";
import { useAuth } from "@/context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InputField from "./InputField";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useDeleteComment } from "@/hooks/useDeleteComment";
interface CommentProps {
  comment: IComment;
  isReply?: boolean;
  postDocId: string;
}

function Comment({ comment, isReply = false, postDocId }: CommentProps) {
  const { user } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const { mutate } = useDeleteComment(postDocId);
  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            mutate(comment.docId);
            break;
          case cancelButtonIndex: {
          }
        }
      }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={20}
            color={colors.BLACK}
          />
        )}
        <Profile
          imageUri={comment.user.imageUri}
          createdAt={comment.createdAt}
          nickname={comment.user.displayName}
          onPress={() => {}}
          option={
            user?.uid === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-horizontal"
                size={20}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField editable={false} value={comment.content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Comment;
