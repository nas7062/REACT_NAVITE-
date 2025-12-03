import CustomButton from "@/components/CustomButton";
import FeedList from "@/components/FeedList";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const { user, profile } = useAuth();

  useEffect(() => {
    user &&
      profile?.displayName &&
      Toast.show({
        type: "info",
        text1: `${profile?.displayName}님 환영합니다`,
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      <CustomButton label="로그아웃" onPress={() => auth.signOut()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
