import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "./CustomButton";
import { colors } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CTAButtonProps {
  label: string;
  onPress: () => void;
}

function CTAButton({ label, onPress }: CTAButtonProps) {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.ctnButton, { paddingBottom: inset.bottom || 12 }]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  ctnButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});

export default CTAButton;
