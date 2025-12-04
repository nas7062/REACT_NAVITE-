import React from "react";
import { Control, Controller } from "react-hook-form";
import InputField from "./InputField";
import { WriteData } from "@/app/post/write";

type Props = {
  control: Control<WriteData>;
};

function DescriptInput({ control }: Props) {
  return (
    <Controller
      name="descript"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="내용"
          placeholder="내용을 입력해주세요."
          value={value}
          onChangeText={onChange}
          multiline
        />
      )}
    />
  );
}

export default DescriptInput;
