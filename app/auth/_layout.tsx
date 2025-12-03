import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

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
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Ionicons name={"home"} size={30} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
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
