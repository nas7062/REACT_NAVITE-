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
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
    </Stack>
  );
}
