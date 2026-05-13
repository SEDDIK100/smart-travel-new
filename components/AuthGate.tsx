import { auth, db } from "@/config";
import { setChats, setUser } from "@/redux/slices/userSlices";
import { useAppDispatch } from "@/redux/stores";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (u?.emailVerified) {
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
          const d = snap.data();
          const age = d.birthdate
            ? Math.floor(
                (Date.now() - new Date(d.birthdate).getTime()) /
                  (365.25 * 24 * 60 * 60 * 1000),
              )
            : null;
          dispatch(
            setUser({
              user: {
                id: u.uid,
                email: u.email,
                password: null,
                username: d.username,
                birthdate: d.birthdate,
                age,
                gender: d.gender,
                createdAt: d.createdAt,
                nationality: d.nationality,
                livingIn: d.livingIn,
                interrests: d.interests,
              },
              token: await u.getIdToken(),
            }),
          );
          const cs = await getDocs(
            query(
              collection(db, "users", u.uid, "chats"),
              orderBy("createdAt", "desc"),
            ),
          );
          dispatch(
            setChats(
              cs.docs.map((c) => ({
                id: c.id,
                createdAt:
                  c.data().createdAt?.toDate().toISOString() ??
                  new Date().toISOString(),
                messages: (c.data().messages ?? []).map((m: any) => ({
                  ...m,
                  createdAt:
                    m.createdAt?.toDate?.()?.toISOString?.() ??
                    new Date().toISOString(),
                })),
              })),
            ),
          );
        }
      }
      setReady(true);
    });
  }, []);

  if (!ready)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0d0d0d",
        }}
      >
        <ActivityIndicator size="large" color="#A3E635" />
      </View>
    );
  return <>{children}</>;
}
