import CustomButton from "@/components/CustomButton";
import Feed from "@/components/Feed";
import { auth } from "@/firebase";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Feed />
      <CustomButton label="로그아웃" onPress={() => auth.signOut()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
