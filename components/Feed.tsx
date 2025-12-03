import React from "react";
import { StyleSheet, View } from "react-native";

interface FeedProps {}

function Feed({}: FeedProps) {
  return (
    <View style={styles.container}>
      <View></View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Feed;
