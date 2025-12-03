// EmailInput.tsx
import { Control, Controller } from "react-hook-form";
import { TextInput, View, Text } from "react-native";
import InputField from "./InputField";

type EmailInputProps<TFieldValues extends { email: string }> = {
  control: Control<TFieldValues>;
};

function EmailInputInner<TFieldValues extends { email: string }>({
  control,
}: EmailInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={"email" as any}
      render={({ field: { value, onChange, onBlur } }) => (
        <View>
          <InputField
            label="이메일"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="test@naver.com"
          />
        </View>
      )}
    />
  );
}

// 제네릭 함수 컴포넌트 export
const EmailInput = <TFieldValues extends { email: string }>(
  props: EmailInputProps<TFieldValues>
) => <EmailInputInner {...props} />;

export default EmailInput;
