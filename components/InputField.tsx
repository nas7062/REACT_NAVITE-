import { colors } from "@/constants";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "outLined";
}

function InputField({ label, variant = "filled", ...props }: InputFieldProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, styles[variant]]}>
        <TextInput
          style={styles.input}
          {...props}
          placeholderTextColor={colors.GRAY_500}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  outLined: {},
  input: {
    width: "100%",
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5,
  },
});

export default InputField;
