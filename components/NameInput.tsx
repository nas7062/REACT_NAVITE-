import React from "react";
import { Controller } from "react-hook-form";
import InputField from "./InputField";
import { ControlProps } from "./EmailInput";

function NameInput({ control }: ControlProps) {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="이름"
          placeholder="이름을 입력해주세요."
          value={value}
          onChangeText={onChange}
          textContentType="username"
        />
      )}
    />
  );
}

export default NameInput;
