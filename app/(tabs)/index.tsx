import Feed from "@/components/Feed";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Feed />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
