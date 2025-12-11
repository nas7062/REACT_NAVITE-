// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SESSION_TIMEOUT_MS } from "@/constants";
import { UserProfile } from "@/types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  profile: UserProfile | null;
  justSignedIn: boolean;
  setJustSignedIn: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [justSignedIn, setJustSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true); // ✅ 상태 변경 시작

      try {
        setUser(firebaseUser);

        if (firebaseUser) {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
            setJustSignedIn(true);
          } else {
            setProfile(null);
          }
        } else {
          setProfile(null);
          setJustSignedIn(false);
        }
      } catch (e) {
        console.log("Auth 상태 처리 중 에러:", e);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      signOut(auth).catch((err) => {
        console.log("자동 로그아웃 실패:", err);
      });
    }, SESSION_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, loading, profile, justSignedIn, setJustSignedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth는 AuthProvider 안에서만 사용가능.");
  }
  return value;
}
