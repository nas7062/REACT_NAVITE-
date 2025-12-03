import React from "react";
import { Control, Controller } from "react-hook-form";
import InputField from "./InputField";
import { SignupFormData } from "@/app/auth/signup";

export type ControlProps = {
  control: Control<SignupFormData>;
};

function EmailInput({ control }: ControlProps) {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={value}
          onChangeText={onChange}
          textContentType="emailAddress"
          autoFocus
        />
      )}
    />
  );
}

export default EmailInput;
