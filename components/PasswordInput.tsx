import React from "react";
import { Control, Controller } from "react-hook-form";
import InputField from "./InputField";

type PasswordInputProps<TFieldValues extends { password: string }> = {
  control: Control<TFieldValues>;
};

const PasswordInput = <TFieldValues extends { password: string }>({
  control,
}: PasswordInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={"password" as any}
      render={({ field: { value, onChange, onBlur } }) => (
        <InputField
          label="비밀번호"
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry
          placeholder="비밀번호 6자리 이상"
        />
      )}
    />
  );
};

export default PasswordInput;
