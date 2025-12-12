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
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "글상세",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: "글수정",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "검색",
          headerTitleAlign: "center",
          headerShown: false,
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
    </Stack>
  );
}
