import { colors } from "@/constants";
import React, { ReactNode, forwardRef } from "react";
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
  rightChild?: ReactNode;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, variant = "filled", rightChild = null, ...props }, ref) => {
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.container,
            styles[variant],
            props.multiline && styles.multiline,
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, props.multiline && styles.multilineInput]}
            {...props}
            placeholderTextColor={colors.GRAY_500}
          />
          {rightChild}
        </View>
      </View>
    );
  }
);

// forwardRef 쓸 때 displayName 붙여주는 게 좋음(디버깅용)
InputField.displayName = "InputField";

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
  outLined: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.GRAY_300,
    backgroundColor: colors.WHITE,
  },
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
  multiline: {
    alignItems: "flex-start",
    paddingVertical: 10,
    height: 200,
  },
  multilineInput: {
    textAlignVertical: "top",
    height: 180,
  },
});

export default InputField;
