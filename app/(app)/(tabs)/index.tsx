import FeedList from "@/components/FeedList";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const { user, profile, loading, justSignedIn, setJustSignedIn } = useAuth();

  const prevUserRef = useRef<UserProfile | null>(null);

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
  }, [loading, user, profile?.displayName, justSignedIn, setJustSignedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      {user && (
        <Pressable
          style={styles.wirteBtn}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name="pencil" color={colors.WHITE} size={30} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  wirteBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.PRIMARY,
    width: 60,
    height: 60,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 2 },
    elevation: 2,
  },
});
