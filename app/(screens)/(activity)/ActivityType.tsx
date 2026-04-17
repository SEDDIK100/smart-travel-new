import Card from "@/components/Card";
import Press from "@/components/Press";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { activityThemes } from "@/constants/data";
import Header from "@/components/Header";
const ActivityType = () => {
  const [type, setType] = useState<any | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
        <Header link="/(screen)/(activity)/Position"/>

      {/*logo*/}
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

      {/*list*/}
      
        <FlatList
          className="mb-2 "
          data={activityThemes}
          renderItem={({ item, index }) => {
            const isSelected = type?.id === item.id
            return(
            <TouchableOpacity onPress={() => setType(item)}>
              
                <Card option={item}  style="  " />
            
            </TouchableOpacity>)
          }}
        />
        <View>


        {/*btn*/}
        <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]" >
          <Press
            title="confirm"
            link={"/(screens)/(plan)/vibe"}
            icon=""
            style=""
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActivityType;
