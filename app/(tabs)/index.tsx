import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.hi}>homeScreen</Text>
      <CustomButton
        label="auth 페이지 이동"
        onPress={() => router.push("/auth")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hi: {
    color: "red",
  },
});
