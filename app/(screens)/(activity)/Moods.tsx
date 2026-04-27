import Card from "@/components/Card";
import Press from "@/components/Press";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moods } from "@/constants/data";
import Header from "@/components/Header";
import { useAppDispatch } from "@/redux/stores";
import { setMood as setMoodAction } from "@/redux/slices/activitySlices";

const Moods = () => {
  const dispatch = useAppDispatch();
  const [selectedMoods, setSelectedMoods] = useState<any | null>(null);

  const handleConfirm = () => {
    if (selectedMoods) {
      dispatch(setMoodAction(selectedMoods.title.trim()));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <Header link="/(screens)/(activity)/activityName" />

      <View className="items-center justify-center w-full h-32 mt-4">
        <Image
          className="w-3/4 h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      <View className="px-6 mb-4 mt-2">
        <Text className="text-white text-2xl font-extrabold tracking-tight">
          How you feel ?
        </Text>
        <Text className="text-gray-400 text-md mt-1">
          Choose the mood you match with.
        </Text>
      </View>

      <View className="flex-1 justify-between">
        <FlatList
          data={moods}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const isActive = selectedMoods?.id === item.id;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedMoods(item)}
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
            link={"/(screens)/(activity)/Position"}
            icon=""
            style=""
            onBeforeNavigate={handleConfirm}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Moods;