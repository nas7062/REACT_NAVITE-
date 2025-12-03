import React from "react";
import { Controller } from "react-hook-form";
import InputField from "./InputField";
import { ControlProps } from "./EmailInput";

function PasswordConfirmInput({ control }: ControlProps) {
  
  return (
    <Controller
      name="passwordConfirm"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={onChange}
          textContentType="password"
          secureTextEntry
        />
      )}
    />
  );
}

export default PasswordConfirmInput;
