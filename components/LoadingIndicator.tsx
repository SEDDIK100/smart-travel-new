import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const LoadingIndicator = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <View className="flex-row items-center gap-2 px-5 pb-2">
      <ActivityIndicator size="small" color="#A3E635" />
      <Text className="text-zinc-500 text-xs">Assistant is thinking… {seconds}s</Text>
    </View>
  );
};