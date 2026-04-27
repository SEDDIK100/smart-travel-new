import Card from "@/components/Card";
import Header from "@/components/Header";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { activityThemes } from "@/constants/data";
import { useAppDispatch } from "@/redux/stores";
import { setActivityType as setActivityTypeAction } from "@/redux/slices/activitySlices";
import { router } from "expo-router";

const ActivityType = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<any | null>(null);

  const handleGenerate = () => {
    if (!type) return;
    dispatch(setActivityTypeAction(type.title.trim()));
    router.push("/(screens)/(activity)/ActivityRes");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(screens)/(activity)/Position" />

      <View className="items-center w-full h-40">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>
      <View className="px-6 mb-4">
        <Text className="text-white text-2xl font-extrabold tracking-tight">
          what you want to do
        </Text>
        <Text className="text-gray-400 text-md mt-1">
          Choose an activity you prefer
        </Text>
      </View>

      <FlatList
        className="mb-2"
        data={activityThemes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelected = type?.id === item.id;
          return (
            <TouchableOpacity onPress={() => setType(item)}>
              <Card
                option={item}
                style={isSelected ? "border-[#A3E635]" : ""}
              />
            </TouchableOpacity>
          );
        }}
      />
      <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]">
        <View className="items-center mt-2">
          <TouchableOpacity
            onPress={handleGenerate}
            disabled={!type}
            className={`bg-[#A3E635] rounded-2xl flex-row w-3/5
              items-center justify-center active:opacity-90 p-4 
              ${!type ? "opacity-50" : ""}`}
          >
            <Text className="text-black font-semibold text-xl">
              Generate Plan ✨
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActivityType;