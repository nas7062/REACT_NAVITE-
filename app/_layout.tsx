import { AuthProvider } from "@/context/AuthContext";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient();
export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <>
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={DefaultTheme}>
            <AuthProvider>
              <Slot />
              <StatusBar style="auto" />
              <Toast />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ActionSheetProvider>
    </>
  );
}
