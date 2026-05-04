import { Stack } from "expo-router";
import React from "react";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="activityName" options={{ headerShown: false }} />
      <Stack.Screen name="Moods" options={{ headerShown: false }} />
      <Stack.Screen name="Position" options={{ headerShown: false }} />
      <Stack.Screen name="ActivityType" options={{ headerShown: false }} />
      <Stack.Screen name="Duration" options={{ headerShown: false }} />
      <Stack.Screen name="Priority" options={{ headerShown: false }} />
      <Stack.Screen name="Rythm" options={{ headerShown: false }} />
      <Stack.Screen name="Cadre" options={{ headerShown: false }} />
      <Stack.Screen name="Comp" options={{ headerShown: false }} />
      <Stack.Screen name="ActivitySummary" options={{ headerShown: false }} />
      <Stack.Screen name="ActivityRes" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
