import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "설정",
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
