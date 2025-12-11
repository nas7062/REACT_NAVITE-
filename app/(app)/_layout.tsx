// app/(app)/_layout.tsx

import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 탭 그룹 */}
      <Stack.Screen name="(tabs)" />

      {/* 탭에서 push 되어 가는 화면들 */}
      <Stack.Screen name="post" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="image" />
    </Stack>
  );
}
