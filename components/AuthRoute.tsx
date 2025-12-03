import { useAuth } from "@/context/AuthContext";
import { router, useFocusEffect } from "expo-router";
import React, { ReactNode, useCallback } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { user, loading } = useAuth();
  useFocusEffect(
    useCallback(() => {
      if (loading) return;

      if (!user) {
        router.replace("/auth");
      }
    }, [loading, user])
  );
  if (loading) {
    return null;
  }

  return <>{children}</>;
}

export default AuthRoute;
