import CTAButton from "@/components/CTAButton";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { z } from "zod";

const WriteSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "이름은 2글자 이상 입니다." })
      .max(6, { message: "이름은 6글자 이하입니다." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "이메일을 입력해주세요" })
      .max(40, { message: "이메일은 40자 이하로 입력해주세요" })
      .email({ message: "올바른 이메일 주소를 입력해주세요" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "비밀번호를 6자 이상 입력해주세요" })
      .max(20, { message: "비밀번호를 20자 이하로 입력해주세요" })
      .regex(/^\S+$/, {
        message: "비밀번호에는 공백을 포함할 수 없습니다",
      })
      .regex(/[0-9]/, {
        message: "비밀번호에는 숫자가 최소 1개 이상 포함되어야 합니다",
      }),
    passwordConfirm: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다",
  });

export type WriteData = z.infer<typeof WriteSchema>;

interface writeProps {}

function WriteScreenPage({}: writeProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteData>({
    resolver: zodResolver(WriteSchema),
  });
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
          <EmailInput control={control} />
          {errors.email && (
            <Text style={styles.errorMessage}>{errors.email.message}</Text>
          )}
          <NameInput control={control} />
          {errors.name && (
            <Text style={styles.errorMessage}>{errors.name.message}</Text>
          )}
          <PasswordInput control={control} />
          {errors.password && (
            <Text style={styles.errorMessage}>{errors.password.message}</Text>
          )}
          <PasswordConfirmInput control={control} />
          {errors.passwordConfirm && (
            <Text style={styles.errorMessage}>
              {errors.passwordConfirm.message}
            </Text>
          )}
        </View>
      </SafeAreaView>
      <CTAButton label="회원가입" onPress={handleSubmit(onHandleSignup)} />
    </>
  );
}

const styles = StyleSheet.create({});

export default WriteScreenPage;
