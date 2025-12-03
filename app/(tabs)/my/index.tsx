import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading]);
  return (
    <View>
      <Text>마이 스크린</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
