import Press from "@/components/Press";
import React, { useState } from "react";
import { Image, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";
import { setActivityName as setActivityNameAction } from "@/redux/slices/activitySlices";
import HeaderQu from "@/components/HeaderQu";

const ActivityName = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const handleConfirm = () => {
    if (name.trim()) {
      dispatch(setActivityNameAction(name.trim()));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <HeaderQu linkPrv="/(tabs)/(guide)/guide" linkNext="/(screens)/(activity)/Moods" />

      <View className=" items-center w-full h-72 ">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/rock3.png")}
        />
      </View>

      <View className="px-5">
        <Text className="text-sm text-gray-300 mb-2"> Activity Name * </Text>
        <TextInput
          className={`text-white text-base p-4 bg-[#1A2235] px-5 rounded-2xl mb-2`}
          placeholder="your activity name"
          placeholderTextColor="#64748B"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View className="my-6">
        <Press
          title="confirm"
          link={"/(screens)/(activity)/Moods"}
          icon=""
          style=""
          onBeforeNavigate={handleConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityName;