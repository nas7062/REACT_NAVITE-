import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export default function ImageScreen() {
  const params = useLocalSearchParams<{ url?: string | string[] }>();

  let url = params.url;
  if (!url) return null;

  if (Array.isArray(url)) {
    url = url[0];
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url }}
        style={{
          width: Dimensions.get("window").width,
          height: "100%",
        }}
        resizeMode="contain"
        onError={(e) => {
          console.log("Image error:", e.nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
