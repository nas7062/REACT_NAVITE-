import { SplashScreen, Stack } from "expo-router";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import { useEffect } from "react";
import { getStorage } from "../util/secureStore";
import { resources } from "../util/resourece";
import { useFonts } from "expo-font";
import Apploading from "expo-app-loading";
export const unstable_settings = {
  initialRouteName: "(tabs)",
};
SplashScreen.preventAutoHideAsync();
const devicelanguage = getLocales()[0].languageCode ?? "ko";

i18n.use(initReactI18next).init({
  resources,
  lng: devicelanguage,
  fallbackLng: "ko",
  debug: true,
});

export default function AppStackLayout() {
  const [loaded] = useFonts({
    NoonnuBasic: require("@/assets/font/NoonnuBasicGothicRegular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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

  if (!loaded) {
    return <Apploading />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 탭 그룹 */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />

      {/* 탭에서 push 되어 가는 화면들 */}
      <Stack.Screen
        name="post"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="image"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
    </Stack>
  );
}
