import React from "react";
import { Stack } from "expo-router";
import AuthGate from "@/components/AuthGate";

const WelcomeLayout = () => {
  
  return (
    <AuthGate>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
    </AuthGate>
  );
};

export default WelcomeLayout;



