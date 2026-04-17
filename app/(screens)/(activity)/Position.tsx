import Card from "@/components/Card";
import Press from "@/components/Press";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { activityPlace } from "@/constants/data";
import Header from "@/components/Header";

const Position = () => {

  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(screen)/(activity)/Moods"/>



      <View className="items-center justify-center w-full h-32 mt-4">
        <Image
          className="w-3/4 h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
          
        />  
      </View>
       <View className="px-6 mb-4 mt-2">
       
                <Text className="text-white text-2xl font-extrabold tracking-tight">
                where you want to be ?
                </Text>
                <Text className="text-gray-400 text-md mt-1">
                Choose a your next position.
                </Text>
             </View>

    

      <View className="flex-1 justify-between">
        <FlatList
          data={activityPlace}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => 

             
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedPosition(item)}
              >
                <View>
              
                 

                  <Card option={item} style="" />
                </View>
              </TouchableOpacity>
        
        }
        />

      
        <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]">
          <Press
            title="Confirm"
            link={"/(screens)/(activity)/ActivityType"}
            icon=""
            style=""
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Position;
