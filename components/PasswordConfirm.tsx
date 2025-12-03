import React from "react";
import { Control, Controller } from "react-hook-form";
import InputField from "./InputField";

type PasswordConfirmInputProps<
  TFieldValues extends { passwordConfirm: string }
> = {
  control: Control<TFieldValues>;
};

const PasswordConfirmInput = <
  TFieldValues extends { passwordConfirm: string }
>({
  control,
}: PasswordConfirmInputProps<TFieldValues>) => {
  return (
    <Controller
      name={"passwordConfirm" as any}
      control={control}
      render={({ field: { onChange, value, onBlur } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={onChange}
          textContentType="password"
          secureTextEntry
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default PasswordConfirmInput;
