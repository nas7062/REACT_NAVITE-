import CustomButton from "@/components/CustomButton";
import FeedList from "@/components/FeedList";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { User } from "@/types";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const { user, profile, loading, justSignedIn, setJustSignedIn } = useAuth();

  const prevUserRef = useRef<User | null>(null);

  useEffect(() => {
    if (loading) return;

    const prevUser = prevUserRef.current;

    if (!prevUser && user && profile?.displayName && justSignedIn) {
      Toast.show({
        type: "info",
        text1: `${profile.displayName}님 환영합니다`,
      });
      setJustSignedIn(false);
    }
    prevUserRef.current = null;
  }, [loading, user, profile?.displayName]);

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
