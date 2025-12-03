import AuthRoute from "@/components/AuthRoute";
import { StyleSheet, Text, View } from "react-native";

export default function SettingScreen() {
  return (
    <AuthRoute>
      <View>
        <Text>세팅 스크린</Text>
      </View>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({});
