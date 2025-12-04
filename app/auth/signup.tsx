import CTAButton from "@/components/CTAButton";
import { auth, db } from "@/firebase";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors } from "@/constants";
import { router } from "expo-router";
import EmailInput from "@/components/EmailInput";
import NameInput from "@/components/NameInput";
import PasswordInput from "@/components/PasswordInput";
import PasswordConfirmInput from "@/components/PasswordConfirm";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SignUpSchema = z
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

export type SignupFormData = z.infer<typeof SignUpSchema>;

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onHandleSignup = async (data: SignupFormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        displayName: data.name,
        email: data.email,
        uid: user.uid,
        createdAt: new Date().toUTCString(),
      });
      Toast.show({
        type: "success",
        text1: `가입이 완료되었습니다.`,
      });
      router.replace("/auth");
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: `가입이 실패하였습니다.`,
      });
    }
  };
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <CTAButton label="회원가입" onPress={handleSubmit(onHandleSignup)} />
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
