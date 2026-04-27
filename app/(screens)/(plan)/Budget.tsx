import Card from "@/components/Card";
import Header from "@/components/Header";
import { budgets } from "@/constants/data";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setBudget as setBudgetAction } from "@/redux/slices/tripSlices";

const Budget = () => {
  const dispatch = useAppDispatch();
  const [selectedBudget, setSelectedBudget] = useState<any | null>(null);

  const handleGenerate = () => {
    if (!selectedBudget) return;
    dispatch(setBudgetAction(selectedBudget.title.trim()));
    router.push("/(screens)/(plan)/PlanRes");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(screens)/(plan)/vibe" />

      <View className="items-center justify-center w-full h-32 mt-4">
        <Image
          className="w-3/4 h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      <View className="px-6 mb-4 mt-2">
        <Text className="text-white text-2xl font-extrabold tracking-tight">
          what is your budget ?
        </Text>
        <Text className="text-gray-400 text-md mt-1">
          Choose the budget you can afford.
        </Text>
      </View>

      <View className="flex-1 justify-between">
        <FlatList
          data={budgets}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const isActive = selectedBudget?.id === item.id;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedBudget(item)}
              >
                <Card
                  option={item}
                  style={isActive ? "border-[#A3E635] h-32" : "h-32"}
                />
              </TouchableOpacity>
            );
          }}
        />

        <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]">
          <View className="items-center mt-2">
            <TouchableOpacity
              onPress={handleGenerate}
              disabled={!selectedBudget}
              className={`bg-[#A3E635] rounded-2xl flex-row w-3/5
                items-center justify-center active:opacity-90 p-4 
                ${!selectedBudget ? "opacity-50" : ""}`}
            >
              <Text className="text-black font-semibold text-xl">
                Generate Plan ✨
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Budget;