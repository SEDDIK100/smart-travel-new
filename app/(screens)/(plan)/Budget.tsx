import Card from "@/components/Card";
import Header from "@/components/Header";
import Press from "@/components/Press";
import { budgets } from "@/constants/data";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Budget = () => {

  
  const [selectedBudget, setSelectedBudget] = useState<any | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(screen)/(plan)/vide"/>

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

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedBudget(item)}
              >
                  <Card option={item} style="h-32 " />
             
              </TouchableOpacity>
            );
          }}
        />

      
        <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]">
          <Press
            title="Confirm"
            link={"/(tabs)/(guide)/vibe"}
            icon=""
            style=""
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Budget;
