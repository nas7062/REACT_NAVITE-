import { Stack } from "expo-router";

export default function MyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "내 프로필",
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="info"
        options={{
          title: "내 프로필 정보",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          title: "내 프로필 편집",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
