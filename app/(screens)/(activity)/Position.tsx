import Card from "@/components/Card";
import Press from "@/components/Press";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { activityPlace } from "@/constants/data";
import Header from "@/components/Header";
import { useAppDispatch } from "@/redux/stores";
import { setPosition as setPositionAction } from "@/redux/slices/activitySlices";
import { router } from "expo-router";
import HeaderQu from "@/components/HeaderQu";
const Position = () => {
  const dispatch = useAppDispatch();
  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);

  const handleConfirm = () => {
    if (selectedPosition) {
      dispatch(setPositionAction(selectedPosition.title.trim()));
      router.push("/(screens)/(activity)/ActivityType");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <HeaderQu linkPrv="/(screens)/(activity)/Moods" linkNext="/(screens)/(activity)/AcivityType"  />

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
          renderItem={({ item }) => {
            const isActive = selectedPosition?.id === item.id;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedPosition(item)}
              >
                <Card
                  option={item}
                  style={isActive ? "border-[#A3E635]" : ""}
                />
              </TouchableOpacity>
            );
          }}
        />

        <View className="px-6 pb-6 pt-4 bg-[#0d0d0d]">
          <Press
            title="Confirm"
            link={"/(screens)/(activity)/Duration"}
            icon=""
            style=""
            onBeforeNavigate={handleConfirm}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Position;