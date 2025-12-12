import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large" | "small";
  variant?: "filled" | "standard" | "outliend";
}

function CustomButton({
  label,
  size = "large",
  variant = "filled",
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[`${variant}Container`],
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <Text style={[styles[`${variant}Label`], styles[`${size}Label`]]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: "100%",
    height: 44,
  },
  medium: {
    width: 84,
    paddingHorizontal: 10,
    height: 30,
  },
  small: {
    width: 40,
    height: 20,
  },
  filledContainer: {
    backgroundColor: colors.ORANGE_600,
  },
  filledLabel: {
    fontSize: 14,
    fontWeight: "semibold",
    color: colors.WHITE,
    fontFamily: "NoonnuBasic",
  },
  outliendContainer: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
  },
  outliendLabel: {
    color: colors.WHITE,
    fontFamily: "NoonnuBasic",
  },
  standardContainer: {
    backgroundColor: colors.WHITE,
  },
  standardLabel: {
    fontSize: 14,
    fontWeight: "semibold",
    color: colors.PRIMARY,
    fontFamily: "NoonnuBasic",
  },
  mediumLabel: { fontSize: 13 },
  smallLabel: { fontSize: 12 },
  largeLabel: { fontSize: 14 },
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
