import AuthRoute from "@/components/AuthRoute";
import { colors } from "@/constants";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.profileImg}
            source={require("@/assets/images/rabbit.png")}
          />
        </View>
        <View style={styles.profileContainer}>
          <Text>username</Text>
          <Text>userEmail</Text>
        </View>
      </SafeAreaView>
    </AuthRoute>
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
  },
});
