import CTAButton from "@/components/CTAButton";
import DescriptInput from "@/components/DescriptInput";
import TitleInput from "@/components/TitleInput";
import { colors } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const WriteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "이름은 2글자 이상 입니다." })
    .max(6, { message: "이름은 6글자 이하입니다." }),
  descript: z
    .string()
    .trim()
    .min(1, { message: "이메일을 입력해주세요" })
    .max(40, { message: "이메일은 40자 이하로 입력해주세요" })
    .email({ message: "올바른 이메일 주소를 입력해주세요" }),
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

  const onHandleWrite = () => {};
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
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
      </SafeAreaView>
      <CTAButton label="회원가입" onPress={handleSubmit(onHandleWrite)} />
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
