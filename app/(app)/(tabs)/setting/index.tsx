import { saveStorage } from "@/app/util/secureStore";
import ListItem from "@/components/ListItem";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const { showActionSheetWithOptions } = useActionSheet();
  const { i18n, t } = useTranslation();

  const handlePressLanguage = () => {
    const options = ["English", "한국어", t("Cancle")];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            i18n.changeLanguage("en");
            saveStorage("language", "en");
            break;
          case 1:
            i18n.changeLanguage("ko");
            saveStorage("language", "ko");
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ListItem
          title={t("languageSetting")}
          iconName="language"
          onPress={handlePressLanguage}
        />
        <ListItem title={t("AppSetting")} iconName="settings" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
