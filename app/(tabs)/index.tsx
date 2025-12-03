import CustomButton from "@/components/CustomButton";
import Feed from "@/components/Feed";
import { auth } from "@/firebase";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Feed />
      <CustomButton label="로그인 이동" onPress={() => router.push("/auth")} />
      <CustomButton label="로그아웃" onPress={() => auth.signOut()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
