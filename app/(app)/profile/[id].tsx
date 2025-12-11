import { useRequireAuth } from "@/components/AuthRoute";
import UserFeedList from "@/components/UserFeedList";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useGetProfile } from "@/hooks/useGetProfile";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { id: userId } = useLocalSearchParams();
  const { user } = useAuth();
  const { data: profile } = useGetProfile(userId as string);
  const { user: userLogin, loading, isNavReady } = useRequireAuth();
  
  if (user?.uid === userId) {
    return <Redirect href={"/my"} />;
  }

  // 네비게이션이 준비되지 않았거나 로딩 중이면 null
  if (loading || !isNavReady) {
    return null;
  }

  // 네비게이션이 준비되었고 user가 없으면 Redirect (렌더 단계에서 처리)
  if (!userLogin) {
    return <Redirect href="/auth" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.profileImg}
          source={
            profile?.imageUri
              ? {
                  uri: profile.imageUri,
                }
              : require("@/assets/images/rabbit.png")
          }
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{profile?.displayName}</Text>
          <Text style={styles.descript}>
            {profile?.descript ? profile?.descript : "저를 소개합니다."}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <UserFeedList userId={userId as string} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  imgContainer: {
    flex: 1,
    backgroundColor: colors.SECONDARY,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  textContainer: {
    marginLeft: 16,
    flexShrink: 1,
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descript: {
    fontSize: 12,
  },
  profileImg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    borderColor: colors.GRAY_200,
    borderWidth: 2,
    backgroundColor: colors.WHITE,
  },

  contentContainer: {
    flex: 2,
    width: "100%",
    alignSelf: "center",
    gap: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
