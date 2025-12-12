import { Stack } from "expo-router";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import { useEffect } from "react";
import { getStorage } from "../util/secureStore";
import { resources } from "../util/resourece";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const devicelanguage = getLocales()[0].languageCode ?? "ko";
console.log("Current device language: ", devicelanguage);

i18n.use(initReactI18next).init({
  resources,
  lng: devicelanguage,
  fallbackLng: "ko",
  debug: true,
});

export default function AppStackLayout() {
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = (await getStorage("language")) ?? devicelanguage;
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };

    loadLanguage();
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 탭 그룹 */}
      <Stack.Screen name="(tabs)" />

      {/* 탭에서 push 되어 가는 화면들 */}
      <Stack.Screen name="post" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="image" />
    </Stack>
  );
}
