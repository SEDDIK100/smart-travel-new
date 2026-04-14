import Card from "@/components/Card";
import Press from "@/components/Press";
import { vb } from "@/constants/data";
import { router } from "expo-router";
import React,{useState} from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Vibe = () => {
  const [selectedVibe,setSelectedVibe] = useState<any|null> (null)
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
     
      <View className="flex-row items-center justify-between px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(screens)/(plan)/travellers")}
          className="bg-white rounded-full h-8 w-8 items-center justify-center "
        >
          <Text> {`<-`} </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 ">
          <Image
            className="h-full w-full rounded-full"
            resizeMode="contain"
            source={require("@/assets/st.jpg")}
          />
        </TouchableOpacity>
      </View>
      
      <View className=" items-center w-full h-48 ">
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
                Choose a plan that fits your travel style.
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
        {/*btn*/}
        <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]" >
          <Press title="confirm" link={"/(screens)/(plan)/Budget"} icon=""  style="" />
        </View>
      
    </SafeAreaView>
  );
};

export default Vibe;
