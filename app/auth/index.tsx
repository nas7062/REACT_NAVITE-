import CustomButton from "@/components/CustomButton";
import { colors } from "@/constants";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.linearGradient}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Dreamer</Text>
          <Text style={styles.subTitle}>꿈을 행동으로 바꾸는 자리</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton label="이메일 로그인" />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE_600,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  },
  title: {
    fontSize: 48,
    color: colors.WHITE,
  },
  subTitle: {
    fontSize: 20,
    color: colors.WHITE,
  },
});
