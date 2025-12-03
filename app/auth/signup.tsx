import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { Image, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SignUpScreen() {
  const inset = useSafeAreaInsets();
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
      <View style={[styles.ctnButton, { paddingBottom: inset.bottom || 12 }]}>
        <CustomButton label="회원가입" />
      </View>
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
    height: 160,
  },
  ctnButton: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});
