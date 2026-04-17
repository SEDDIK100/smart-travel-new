import { router } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slices/loadingSlices";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config";

const Forgot = () => {
  const [email , setEmail]= useState("")

  const dispatch =useDispatch()

  const onForgotPassword = async () => {

        try {
            dispatch(setLoadingTrue());
            await sendPasswordResetEmail(auth, email);
          
        } catch (error: any) {
            console.error("Forgot password error:", error);
        }finally{
            dispatch(setLoadingFalse());
            router.push("/(auth)/signin");
        }
    };


  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d] ">
      <View className="flex-row justify-between itmes-center mt-2 mb-2 px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/signin")}
          className="w-10 h-10 rounded-full bg-white
                     items-center justify-center"
        >
          <Text> {`<-`} </Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-10 w-10 ">
          <Image
            className="rounded-full flex-1  "
            source={require("@/assets/st.jpg")}
          />
        </TouchableOpacity>
      </View>
      {/*logo*/}
      <View className="w-full h-48 ">
        <Image
          className=" shadow-slate-700 h-full w-full "
          resizeMode="contain"
          source={require("@/assets/999.png")}
        />
      </View>

      {/*title*/}
      <View className="items-center">
        <Text className="text-white text-4xl text-bold text-center mb-4">
          Forget password
        </Text>
        <Text className="text-gray-400 text-base text-center  mb-4 ">
          enter your email adress and we will send a digit code instantly
        </Text>
      </View>

      {/*form*/}
      <View className="px-5">
        {/*email*/}
        <Text className="text-gray-300 text-sm mb-2 ">email adresse </Text>
        <TextInput
          className="bg-[#1A2235] text-white px-5 py-4 rounded-2xl mb-6"
          placeholder="example@gmail.com"
          placeholderTextColor="#64748B"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {/*signiin*/}
      <View className=" items-center">
        <TouchableOpacity
        onPress={onForgotPassword}
          className="bg-[#A3E635] py-4 rounded-2xl flex-row w-3/5
                          items-center justify-center active:opacity-90 "
        >
          <Text className="text-black font-semibold text-lg"> send </Text>
        </TouchableOpacity>
      </View>

      {/*footer */}

      <View className="flex-row justify-center mt-auto mb-10">
        <Text className=" text-gray-400 "> don t have an account </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/signup")}
          className=""
        >
          <Text className="text-emerald-500 dont-semibold ">signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Forgot;
