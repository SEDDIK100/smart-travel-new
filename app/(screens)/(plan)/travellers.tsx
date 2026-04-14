import Card from "@/components/Card";
import Press from "@/components/Press";
import { travel } from "@/constants/data";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Travellers = () => {
  const [traveller, setTraveller] = useState<any | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <View className="flex-row items-center justify-between px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(screens)/(plan)/TripName")}
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
        <View className="px-6 mb-4 mt-2">
                    <Text className="text-white text-2xl font-extrabold tracking-tight">
                      Select the vibe you like
                    </Text>
                    <Text className="text-gray-400 text-md mt-1">
                      Choose a plan that fits your travel style.
                    </Text>
                  </View>

      {/*list*/}
      <View>
        <FlatList
          className="mb-2"
          data={travel}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setTraveller(item)}>
              <View>
                <Card option={item} style="" />
              </View>
            </TouchableOpacity>
          )}
        />

        {/*btn*/}
        <View>
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

export default Travellers;
