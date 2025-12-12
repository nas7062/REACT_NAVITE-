import RequireAuthScreen from "@/components/RequireAuthScreen";
import CustomButton from "@/components/CustomButton";
import NativePager from "@/components/NativePager";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserCheck from "@/hooks/useUserCheck";
export default function MyProfileScreen() {
  const { profile } = useAuth();
  const { user, loading } = useUserCheck();

  const [currentTab, setCurrentTab] = useState(0);
  const pagerRef = useRef<any>(null);

  const handlePressTab = (idx: number) => {
    setCurrentTab(idx);
    pagerRef.current?.setPage?.(idx);
  };
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>로그인 상태 확인 중...</Text>
      </SafeAreaView>
    );
  }
  return (
    <>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
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
            <View style={styles.updateBtn}>
              <CustomButton
                label="프로필 정보"
                size="medium"
                variant="filled"
                onPress={() => router.push("/my/info")}
              />
            </View>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <Tab
            isActive={currentTab === 0}
            label="내 게시물"
            onPress={() => handlePressTab(0)}
          />
          <Tab
            isActive={currentTab === 1}
            label="좋아요 한 게시물"
            onPress={() => handlePressTab(1)}
          />
        </View>
        <View style={styles.contentContainer}>
          <NativePager currentTab={currentTab} />
        </View>
      </SafeAreaView>
    </>
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
    fontFamily: "NoonnuBasic",
  },
  descript: {
    fontSize: 12,
    fontFamily: "NoonnuBasic",
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
    fontFamily: "NoonnuBasic",
  },
  logoutBtn: {
    backgroundColor: colors.PRIMARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: "auto",
    borderRadius: 8,
  },
  logoutText: {
    color: colors.WHITE,
  },
  updateBtn: {
    position: "absolute",
    top: -40,
    right: -100,
  },
});
