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
        name="index"
        options={{
          title: "로그인",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "회원가입",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
