// components/RequireAuthScreen.tsx
import { ReactNode, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator, Text } from "react-native";

type Props = {
  children: ReactNode;
};

export default function RequireAuthScreen({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log(!!user, loading);
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
        <Text>로그인 상태 확인 중...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
