import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/stores";

const Index = () => {
  const currentUser= useSelector((state: RootState)=>  state.user.user)
  
  useFocusEffect(

    useCallback(() => {
      const checkToken = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('token');
          if(storedToken){
              if(currentUser?.username==="" && currentUser?.birthdate==="" && currentUser?.gender==="" ){
                router.replace('/(auth)/informPer')
              }else if(currentUser?.username!==""&& currentUser?.birthdate!=="" && currentUser?.gender!=="") {

                console.log('sotred tooken',storedToken)
                router.replace("/(tabs)/(guide)/guide")
              } 

//             setToken(storedToken);
//             signIn(dispatch, router, t, undefined, undefined, true)
          }
        } catch (error) {
          console.log('Erreur lors de la vérification du token :', error);

        }
      };
      checkToken();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <View className="flex-1 items-center ">
        <View className="items-center">
        <Image
          className=" shadow-slate-700 absolute w-1/2" resizeMode="contain"
          source={require("@/assets/rockw.png")}
        />
        </View>

        <View className="flex-col justify-center items-center top-1/2">
          <Text className="text-5xl text-white font-bold mt-2 max-w-xl  text-bold text-center">
            Plan Less {"\n"} Experience More
          </Text>
          <Text className="text-center text-sm p-6 text-gray-500">
            Discover your next adventure efffortlesly. Personalized itineraries
            at your fingertips . Travel smarter with ai driven insights.
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/(welcome)/welcome")}
            className="gap-2 px-4  border border-white items-center justify-center py-3 mt-8 flex-row rounded-full"
          >
            <Text className="text-center text-lg text-white">Let s start</Text>
            <FontAwesome5 name="plane-departure" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
