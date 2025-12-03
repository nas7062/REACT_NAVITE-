import CTAButton from "@/components/CTAButton";
import InputField from "@/components/InputField";
import { auth, db } from "@/firebase";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onHandleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, {
            username: name,
            email: email,
            uid: user.uid,
            createdAt: new Date().toUTCString(),
          });
        })
        .then(() => alert("Data uploaded"));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/images/rabbit.png")}
        />
      </View>
      <View style={styles.container}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          textContentType="emailAddress"
          autoFocus
        />
        <InputField
          label="이름"
          placeholder="이름을 입력해주세요."
          textContentType="username"
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          textContentType="password"
          secureTextEntry
        />
        <InputField
          label="비밀번호확인"
          placeholder="비밀번호를 다시 입력해주세요."
          textContentType="password"
          secureTextEntry
        />
      </View>
      <CTAButton label="회원가입" onPress={onHandleSignup} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
