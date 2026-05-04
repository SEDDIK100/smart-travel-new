import { Stack } from "expo-router";
import React from "react";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="TripName" options={{ headerShown: false }} />
      <Stack.Screen name="DestinationType" options={{ headerShown: false }} />
      <Stack.Screen name="TripMood" options={{ headerShown: false }}       />
      <Stack.Screen name="TripComp" options={{ headerShown: false }} />
      <Stack.Screen name="TripDuration" options={{ headerShown: false }} />
      <Stack.Screen name="TripBudget" options={{ headerShown: false }} />
      <Stack.Screen name="TripDistance" options={{ headerShown: false }} />
      <Stack.Screen name="Interrests" options={{ headerShown: false }} />
      <Stack.Screen name="TripStyle" options={{ headerShown: false }} />
      <Stack.Screen  name="TripSummary" options={{ headerShown: false }} />
      <Stack.Screen name="PlanRes" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
