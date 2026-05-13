import { store } from "@/redux/stores";
import { Stack } from "expo-router"; // Utiliser Stack au lieu de Slot
import { Provider } from "react-redux";
import "../global.css";
import { useState, useEffect } from "react";
import AuthGate from "@/components/AuthGate";

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulation de chargement initial (Splash Screen)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) return null;

  return (
    <Provider store={store}>
      {/* AuthGate vérifie la session Firebase avant d'afficher les pages */}
      <AuthGate>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(welcome)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthGate>
    </Provider>
  );
}