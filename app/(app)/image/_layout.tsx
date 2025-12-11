import { Stack } from "expo-router";

export default function ImageLayout() {
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
        name="index"
        options={{
          title: "이미지 존",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
