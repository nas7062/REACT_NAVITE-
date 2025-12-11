import CustomButton from "@/components/CustomButton";
import { colors } from "@/constants";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";

const SignInSchema = z.object({
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
});
export type SigninFormData = z.infer<typeof SignInSchema>;

export default function AuthScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onLogin = async (data: SigninFormData) => {
    if (!data.email || !data.password) return;
    const email = data.email;
    const password = data.password;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: `로그인에 실패하였습니다.`,
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#15c9b1", "#4dd8c5", "#6bd89c"]}
        style={styles.linearGradient}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Dreamer</Text>
          <Text style={styles.subTitle}>꿈을 행동으로 바꾸는 자리</Text>
        </View>
        <View style={styles.buttonContainer}>
          <EmailInput control={control} />
          {errors.email && (
            <Text style={styles.errorMessage}>{errors.email.message}</Text>
          )}

          <PasswordInput control={control} />
          {errors.password && (
            <Text style={styles.errorMessage}>{errors.password.message}</Text>
          )}
          <CustomButton label="로그인" onPress={handleSubmit(onLogin)} />
          <View style={styles.messageContainer}>
            <Text style={styles.message}>아직 회원이 아니신가요?</Text>
            <Pressable onPress={() => router.push("/auth/signup")}>
              <Text style={styles.signUpText}>회원가입</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15c9b1",
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 48,
    color: colors.WHITE,
  },
  subTitle: {
    fontSize: 20,
    color: colors.WHITE,
  },
  input: {
    width: "100%",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.WHITE,
  },
  messageContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  message: {
    color: colors.GRAY_700,
  },
  signUpText: {
    textDecorationLine: "underline",
  },
  errorMessage: {
    color: colors.ORANGE_600,
    fontSize: 12,
  },
});
