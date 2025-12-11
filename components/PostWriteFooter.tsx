import { colors } from "@/constants";
import { ImageUri } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onChangeImages: (urls: ImageUri[]) => void;
};
function PostWriteFooter({ onChangeImages }: Props) {
  const inset = useSafeAreaInsets();
  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const images: ImageUri[] = result.assets.map((asset, index) => ({
      id: `${Date.now()}-${index}`,
      url: asset.uri,
    }));
    onChangeImages(images);
  };
  return (
    <View style={[styles.container, { paddingBottom: inset.bottom || 10 }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name="camera" size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    paddingVertical: 10,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: "row",
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_200,
    padding: 10,
    borderRadius: 4,
  },
});

export default PostWriteFooter;
