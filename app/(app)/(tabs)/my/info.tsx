import RequireAuthScreen from "@/components/AuthRoute";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { useGetPosts } from "@/hooks/useGetPosts";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function MyInfoScreen() {
  const { profile, user } = useAuth();
  const posts = useGetPosts();

  // 유저가 아직 안 불러졌으면 0으로 처리
  const myPostsLen = user
    ? posts.filter((post) => post.userId === user.uid).length
    : 0;

  // 내가 작성한 댓글 총 개수
  const myCommentLen = user
    ? posts.reduce((sum, post) => {
        // comments가 배열인지 먼저 확인
        if (!Array.isArray(post.comments)) {
          return sum;
        }

        const myCommentsInPost = post.comments.reduce((innerSum, comment) => {
          // comment가 이상한 값일 수도 있으니 한 번 더 방어
          if (!comment || typeof comment !== "object") {
            return innerSum;
          }

          // 데이터 구조에 따라 user.id 또는 userId를 쓰는 경우가 있을 수 있어서 둘 다 체크
          const commentUserId =
            (comment as any).user?.id ?? (comment as any).userId;

          if (!commentUserId) {
            return innerSum;
          }

          return commentUserId === user.uid ? innerSum + 1 : innerSum;
        }, 0);

        return sum + myCommentsInPost;
      }, 0)
    : 0;

  return (
    <RequireAuthScreen>
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
            onError={(e) => {
              console.log("IMAGE ERROR >>>", e.nativeEvent);
            }}
          />
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>유저 이름</Text>
            <Text>{profile?.displayName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>유저 이메일</Text>
            <Text>{user?.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>작성한 글 개수</Text>
            <Text>{myPostsLen}개</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>작성한 댓글 개수</Text>
            <Text>{myCommentLen}개</Text>
          </View>
          <Pressable
            onPress={() => {
              router.push("/my/update");
            }}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>프로필 편집</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              auth.signOut();
              Toast.show({
                type: "success",
                text1: "로그아웃 완료",
              });
            }}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>로그아웃</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </RequireAuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: {
    width: 140,
    height: 140,
    borderRadius: 30,
    overflow: "hidden",
  },

  profileContainer: {
    flex: 1,
    width: "80%",
    marginHorizontal: "auto",
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
});
