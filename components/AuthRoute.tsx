import { useAuth } from "@/context/AuthContext";
import { router, useFocusEffect } from "expo-router";
import React, { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { user } = useAuth();

  useFocusEffect(() => {
    !user && router.replace("/auth");
  });
  return <>{children}</>;
}

export default AuthRoute;
