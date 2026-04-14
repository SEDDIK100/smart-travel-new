import Card from "@/components/Card";
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
      <View className="flex-row items-center justify-between px-6 mt-2">
        <TouchableOpacity  
          onPress={() => router.replace("/(screens)/(plan)/vibe")}
          className="bg-[#1c1c1e] border border-white/10 rounded-full h-10 w-10 items-center justify-center"
        >
          <Text className="text-white text-lg">{"<-"}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-10 h-10">
          <Image
            className="h-full w-full rounded-full border-2 border-[#1c1c1e]"
            resizeMode="cover"
            source={require("@/assets/st.jpg")}
          />
        </TouchableOpacity>
      </View>

      <View className="items-center justify-center w-full h-32 mt-4">
        <Image
          className="w-3/4 h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      <View className="px-6 mb-4 mt-2">
        <Text className="text-white text-2xl font-extrabold tracking-tight">
          Select Your Budget
        </Text>
        <Text className="text-gray-400 text-md mt-1">
          Choose a plan that fits your travel style.
        </Text>
      </View>

      <View className="flex-1 justify-between">
        <FlatList
          data={budgets}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const isActive = selectedBudget === item;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedBudget(item)}
              >
                <View
                  className={`mx-6 mb-4 rounded-2xl border-2 transition-all duration-200`}
                >
              
                  {isActive && (
                    <View className="absolute top-4 right-4 h-3 w-3 rounded-full bg-indigo-500 z-10" />
                  )}

                  <Card option={item} style="" />
                </View>
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
