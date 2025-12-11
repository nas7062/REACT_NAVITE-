import { Stack } from "expo-router";

export default function ProfileLayout() {
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
        name="[id]"
        options={{
          title: "유저 프로필",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
