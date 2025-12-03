import CustomButton from "@/components/CustomButton";
import { colors } from "@/constants";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import InputField from "@/components/InputField";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onLogin = async () => {
    if (!email || !password) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      alert(`${user.email}님 환영합니다.`);
      clearInputs();

      router.replace("/");
    } catch (error: any) {
      alert(error);
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
          <InputField
            label="이메일"
            value={email}
            onChangeText={(value) => setEmail(value)}
            textContentType="emailAddress"
            placeholder="test@naver.com"
            autoFocus={true}
          />
          <InputField
            label="비밀번호"
            value={password}
            onChangeText={(value) => setPassword(value)}
            textContentType={"password"}
            secureTextEntry
            placeholder="비밀번호 6자리 이상"
          />
          <CustomButton label="로그인" onPress={onLogin} />
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
});
