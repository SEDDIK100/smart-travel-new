import { RootState } from "@/redux/stores";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Press from "@/components/Press";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);

  if (!user) {
    return (
      <SafeAreaView>
        <View>        <Text>  home  </Text>   </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className="flex-1 bg-[#0d0d0d]">
        {/*header*/}
        <View className="flex-row items-center justify-between mx-6 ">
          <Text className="text-white"> seaRock </Text>

          <TouchableOpacity className="h-20 w-20 ">
            <Image
              className="h-full w-full"
              resizeMode="contain"
              source={require("@/assets/rock4.png")}
            />
          </TouchableOpacity>
        </View>

        {/*logo*/}
        <View className=" items-center w-full h-72">
          <Image
            className="w-full h-full"
            resizeMode="contain"
            source={require("@/assets/rock4.png")}
          />
        </View>

        {/*fields*/}

        <View className="flex-col gap-6 mb-8">
          <View className="items-center flex-row justify-center gap-5 ">
            <Text className="text-white text-7xl font-semibold ">Sorry</Text>
            <FontAwesome6 name="face-smile-wink" size={80} color="white" />
          </View>
          <View className="items-center mx-6">
            <Text className="text-white text-4xl text-center font-normal mb-3">
              Don t miss new destibnations and vibes
            </Text>
            <Text className="text-gray-300 text-2xl text-center font-light">
              Sign in to see updates from around the worlds
            </Text>
          </View>
        </View>

        {/*btn*/}
        <View>
          <Press title="signin" link={"/(auth)/signin"} icon="" />
        </View>
      </SafeAreaView>
    );
  }
};

export default Home;
