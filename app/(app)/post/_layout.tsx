import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: "글쓰기",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "글상세",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: "글수정",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
