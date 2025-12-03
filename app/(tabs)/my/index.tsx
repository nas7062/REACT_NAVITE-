import AuthRoute from "@/components/AuthRoute";
import { StyleSheet, Text, View } from "react-native";

export default function MyScreen() {
  return (
    <AuthRoute>
      <View>
        <Text>마이 스크린</Text>
      </View>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({});
