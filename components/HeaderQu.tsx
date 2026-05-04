import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface header {
  linkPrv: any;
  linkNext: any
}

const HeaderQu = ({ linkPrv, linkNext }: header) => {
  return (
    <View className="flex-row items-center justify-between px-6 mt-2">
      <TouchableOpacity
        onPress={() => router.push(linkPrv)}
        className="bg-[#1c1c1e] border border-white/10 rounded-full h-10 w-10 items-center justify-center"
      >
        <Text className="text-white text-lg">{"<-"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(linkNext)} className="mb-3">
        <Text className="text-gray-500 text-base">Skip →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderQu;
