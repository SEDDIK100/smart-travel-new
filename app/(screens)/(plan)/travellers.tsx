import Card from "@/components/Card";
import Header from "@/components/Header";
import Press from "@/components/Press";
import { travel } from "@/constants/data";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setTravellers as setTravellersAction } from "@/redux/slices/tripSlices";

const Travellers = () => {
  const dispatch = useAppDispatch();
  const [traveller, setTraveller] = useState<any | null>(null);

  const handleConfirm = () => {
    if (traveller) {
      dispatch(setTravellersAction(traveller.title.trim()));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(screens)/(plan)/TripName" />

      <View className="items-center w-full h-40">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>
      <View className="px-6 mb-4">
        <Text className="text-white text-2xl font-extrabold tracking-tight">
          how many are you ?
        </Text>
        <Text className="text-gray-400 text-md mt-1">
          Choose a you accompany.
        </Text>
      </View>

      <FlatList
        className="mb-2"
        data={travel}
        renderItem={({ item }) => {
          const isSelected = traveller?.id === item.id;
          return (
            <TouchableOpacity onPress={() => setTraveller(item)}>
              <Card
                option={item}
                style={isSelected ? "border-[#A3E635]" : ""}
              />
            </TouchableOpacity>
          );
        }}
      />
      <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]">
        <Press
          title="confirm"
          link={"/(screens)/(plan)/vibe"}
          icon=""
          style=""
          onBeforeNavigate={handleConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

export default Travellers;