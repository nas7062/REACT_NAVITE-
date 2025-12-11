import useUploadImage from "@/api/image";
import CustomButton from "@/components/CustomButton";
import DescriptInput from "@/components/DescriptInput";
import ImagePreviewList from "@/components/ImagePreviewList";
import PostWriteFooter from "@/components/PostWriteFooter";
import TitleInput from "@/components/TitleInput";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useCreatePost } from "@/hooks/useCreatePost";
import { ImageUri } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
const WriteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "제목은 2글자 이상 입니다." })
    .max(20, { message: "제목은 20글자 이하입니다." }),
  descript: z
    .string()
    .trim()
    .min(1, { message: "내용을 입력해주세요" })
    .max(100, { message: "내용은 100자 이하로 입력해주세요" }),
});

export type WriteData = z.infer<typeof WriteSchema>;

function WriteScreenPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteData>({
    resolver: zodResolver(WriteSchema),
  });
  const [imageUrls, setImageUrls] = useState<ImageUri[]>([]);
  const uploadImage = useUploadImage();
  const navigation = useNavigation();
  const { profile } = useAuth();
  const { mutate } = useCreatePost();

  const handleChangeImages = (newImages: ImageUri[]) => {
    setImageUrls((prev) => [...prev, ...newImages]);
  };

  const onHandleWrite = async (data: WriteData) => {
    if (!profile) return;
    const uploaded = await Promise.all(
      imageUrls.map(async (img) => ({
        id: img.id,
        url: await uploadImage(img.url),
      }))
    );

    mutate({
      title: data.title,
      description: data.descript,
      imageUris: uploaded,
      profile,
    });
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="small"
          variant="standard"
          onPress={handleSubmit(onHandleWrite)}
        />
      ),
    });
  }, [handleSubmit, navigation, onHandleWrite]);
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require("@/assets/images/rabbit.png")}
            />
          </View>
          <View style={styles.container}>
            <TitleInput control={control} />
            {errors.title && (
              <Text style={styles.errorMessage}>{errors.title.message}</Text>
            )}
            <DescriptInput control={control} />
            {errors.descript && (
              <Text style={styles.errorMessage}>{errors.descript.message}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
        <ImagePreviewList imageUrls={imageUrls} />
        <PostWriteFooter onChangeImages={handleChangeImages} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 2,
    margin: 16,
    gap: 10,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 140,
  },
  errorMessage: {
    color: colors.ORANGE_600,
    fontSize: 12,
  },
});

export default WriteScreenPage;
