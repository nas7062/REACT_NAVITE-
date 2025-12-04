import DescriptInput from "@/components/DescriptInput";
import TitleInput from "@/components/TitleInput";
import { colors } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useCreatePost } from "@/hooks/useCreatePost";
import CustomButton from "@/components/CustomButton";
import { useGetPostById } from "@/hooks/useGetPostById";
import { useUpdatePost } from "@/hooks/useUpdatePost";
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

function PostUpdateScreen() {
  const { id } = useLocalSearchParams();
  const { data: post } = useGetPostById(id as string);
  const navigation = useNavigation();
  const updatePost = useUpdatePost();
  const { profile } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WriteData>({
    resolver: zodResolver(WriteSchema),
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        descript: post.description,
      });
    }
  }, [post, reset]);

  const onHandleWrite = (data: WriteData) => {
    if (!profile || !id) return;

    updatePost.mutate(
      {
        docId: id as string,
        body: {
          title: data.title,
          description: data.descript,
          imageUris: [],
          profile,
        },
      },
      {
        onSuccess: () => router.back(),
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="수정"
          size="medium"
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

export default PostUpdateScreen;
