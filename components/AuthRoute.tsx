// components/RequireAuthScreen.tsx
import { ReactNode } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
};

export default function RequireAuthScreen({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    // 로딩 중이면 스켈레톤/로딩 뷰 넣어도 됨
    return null;
  }

  if (!user) {
    return <Redirect href="/auth" />;
  }

  return <>{children}</>;
}
