import Card from "@/components/Card";
import Header from "@/components/Header";
import Press from "@/components/Press";
import { vb } from "@/constants/data";
import React,{useState} from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Vibe = () => {
  const [selectedVibe,setSelectedVibe] = useState<any|null> (null)
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
     
      <Header link="/(screens)/(plan)/travellers"/>
      
      <View className=" items-center w-full h-40 ">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

       <View className="px-6 mb-4 mt-2">
              <Text className="text-white text-2xl font-extrabold tracking-tight">
                Select the vibe you like
              </Text>
              <Text className="text-gray-400 text-md mt-1">
                Choose the atmosphere you want to be in.
              </Text>
            </View>

      
         <FlatList
          data={vb}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const isActive = selectedVibe === item;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedVibe(item)}
              >
                <View className="">
                 

                  <Card option={item} style="my-1 h-32" />
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/*btn*/}
        <View className="px-6 pb-6 pt-4  bg-[#0d0d0d]" >
          <Press title="confirm" link={"/(screens)/(plan)/Budget"} icon=""  style="" />
        </View>
      
    </SafeAreaView>
  );
};

export default Vibe;
