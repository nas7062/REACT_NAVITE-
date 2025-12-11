import CTAButton from "@/components/CTAButton";
import { db } from "@/firebase";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors } from "@/constants";
import { router } from "expo-router";
import NameInput from "@/components/NameInput";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "@/context/AuthContext";
import IntroduceInput from "@/components/IntroduceInput";
import ImageInput from "@/components/ImageUrlInput";
import useUploadImage from "@/api/image";
import RequireAuthScreen from "@/components/RequireAuthScreen";

const ProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "이름은 2글자 이상 입니다." })
    .max(6, { message: "이름은 6글자 이하입니다." }),

  descript: z
    .string()
    .trim()
    .min(2, { message: "소개는 2글자 이상 입니다." })
    .max(20, { message: "소개는 20글자 이하입니다." }),
  imageUrl: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof ProfileSchema>;

export default function ProfileUpdateScreen() {
  const { user } = useAuth();
  const uploadImage = useUploadImage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
  });

  const onHandleSignup = async (data: ProfileFormData) => {
    if (!user) return;
    try {
      let imageUrl = data.imageUrl ?? null;

      if (imageUrl) {
        imageUrl = await uploadImage(imageUrl);
      }
      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        {
          displayName: data.name,
          email: user.email,
          uid: user.uid,
          descript: data.descript,
          createdAt: new Date().toUTCString(),
          imageUri: imageUrl ?? null,
        },
        { merge: true }
      );
      Toast.show({
        type: "success",
        text1: `정보 변경이 완료되었습니다.`,
      });
      router.replace("/my/info");
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: `정보 변경이 실패하였습니다.`,
      });
    }
  };
  return (
    <RequireAuthScreen>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <NameInput control={control} />
            {errors.name && (
              <Text style={styles.errorMessage}>{errors.name.message}</Text>
            )}
            <IntroduceInput control={control} />
            {errors.descript && (
              <Text style={styles.errorMessage}>{errors.descript.message}</Text>
            )}
            <ImageInput control={control} />
            {errors.imageUrl && (
              <Text style={styles.errorMessage}>{errors.imageUrl.message}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
        <CTAButton label="프로필 변경" onPress={handleSubmit(onHandleSignup)} />
      </SafeAreaView>
    </RequireAuthScreen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 2,
    margin: 16,
    gap: 10,
  },
  image: {
    width: 100,
    height: 140,
  },
  errorMessage: {
    color: colors.ORANGE_600,
    fontSize: 12,
  },
});
