import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type props = {
  title: any;
  link: any;
  icon: any;
  style: any;
  onBeforeNavigate?: () => void;
};

const Press = ({ title, link, icon, style, onBeforeNavigate }: props) => {
  const handlePress = () => {
    if (onBeforeNavigate) {
      onBeforeNavigate();
    }
    router.push(link);
  };

  return (
    <>
      <View className="items-center mt-2">
        <TouchableOpacity
          onPress={handlePress}
          className={` bg-[#A3E635] ${style} rounded-2xl flex-row w-3/5
                   items-center justify-center active:opacity-90 p-4 `}
        >
          <View className="flex-row items-center">
            <Text className="text-black font-semibold text-xl"> {title} </Text>
            <Text className="text-black font-semibold text-lg"> {icon} </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Press;