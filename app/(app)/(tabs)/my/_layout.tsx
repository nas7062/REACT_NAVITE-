import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "내 프로필",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="info"
        options={{
          title: "내 정보",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          title: "내 프로필 변경",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
    </Stack>
  );
}
