import Card from "@/components/Card";
import Press from "@/components/Press";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { budgets } from "@/constants/data";

const Budget = () => {
 
  const [budget, setBudget] = useState<any | null>(null);


  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <View className="flex-row items-center justify-between px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/(guide)/(plan)/vibe")}
          className="bg-white rounded-full h-8 w-8 items-center justify-center"
        >
          <Text> {"<-"} </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 ">
          <Image
            className="h-full w-full rounded-full"
            resizeMode="contain"
            source={require("@/assets/st.jpg")}
          />
        </TouchableOpacity>
      </View>

      {/*logo*/}
      <View className="items-center w-full h-48">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      {/*list*/}
      <View>
        <FlatList
          className="mb-2"
          data={budgets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setBudget(item)}>
              <View  className={`mx-6 mb-3 rounded-2xl
            ${budget ===item} ? "bg-slate-300 scale-105" : "bg-transparent"}
          `}>
              <Card option={item} />
              </View>
            </TouchableOpacity>
          )}
        />
        {/*btn*/}
        <View>
          <Press title="confirm" link={"/(tabs)/(guide)/vibe"} icon="" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Budget;
