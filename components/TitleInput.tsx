import React from "react";
import { Control, Controller } from "react-hook-form";
import InputField from "./InputField";
import { WriteData } from "@/app/post/write";

type Props = {
  control: Control<WriteData>;
};

function TitleInput({ control }: Props) {
  return (
    <Controller
      name="title"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="제목"
          placeholder="제목을 입력해주세요."
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default TitleInput;
