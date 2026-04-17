import Press from "@/components/Press";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
interface error{
  title :string,
  desc : string,
  sub: string
}



const Error = ({title, desc,sub}:error)  => {
  

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/*header*/}
      <Header link="" />

      {/*logo*/}
      <View className=" items-center w-full h-40">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/rock4.png")}
        />
      </View>

      {/*fields*/}

      <View className="flex-col gap-6 mb-8">
        <View className="items-center flex-row justify-center gap-5 ">
          <Text className="text-white text-3xl font-semibold "> {title} </Text>
          <FontAwesome6 name="face-smile-wink" size={40} color="white" />
        </View>
        <View className="items-center mx-6">
          <Text className="text-white text-2xl text-center font-normal mb-3">
            {desc}
          </Text>
          <Text className="text-gray-300 text-xl text-center font-light">
            {sub}
          </Text>
        </View>
      </View>

      {/*btn*/}
      <View>
        <Press title="signin" link={"/(auth)/signin"} icon="" style="" />
      </View>
    </SafeAreaView>
  );
};

export default Error;
