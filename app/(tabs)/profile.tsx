import { RootState } from "@/redux/stores";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Press from "@/components/Press";



const Profile = () => {
  const userInform = useSelector((state: RootState) => state.user);

  if (userInform) {
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
        <View className=" items-center w-full h-72 ">
          <Image
            className="w-full h-full"
            resizeMode="contain"
            source={require("@/assets/rockp.png")}
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
              Enjoy your favorite trips
            </Text>
            <Text className="text-gray-300 text-2xl text-center font-light">
              Sign in to access trips that you ve liked or saved
            </Text>
          </View>
        </View>

        {/*btn*/}
        <View>
          <Press title="sign" link={"/(auth)/signin"} icon="" />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <ScrollView className="flex-1 bg-gray-800">
        <SafeAreaView>
          <View className="items-center">
            <Text className="text-white text-lg ">Profile</Text>
          </View>

          <View className=" items-center w-full mt-16">
            <Image
              className="w-32 h-32 rounded-full border-4 border-white"
              resizeMode="contain"
              source={require("@/assets/rock4.png")}
            />
            <Text className="mt-3 text-xl font-bold text-gray800">
              user account
            </Text>
            <Text className="text-center text-gray-500 mt-2 px-6">
              
             this is my profile
            </Text>
          </View>

          {/*stats*/}
          <View className="flex-row justify-around mt-6 px-4">
            <View className="items-center">
              <Text className="text-lg"> like </Text>
              <Text> like </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
};

export default Profile;
