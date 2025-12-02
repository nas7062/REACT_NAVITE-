import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [name, setName] = useState("");
  return (
    <SafeAreaView>
      <Text style={styles.hi}>하이</Text>
      <TextInput value={name} onChangeText={(value) => setName(value)} />
      <Button title="explor로 이동" onPress={() => router.push("/explore")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hi: {
    color: "red",
  },
});
