import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth, db } from "@/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        confirmPassword,
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username: "",
        phoneNumber: "",
        address: "",
        imageUrl: "",
        createdAt: new Date().toISOString(),
      });
    } else {
      console.log("eororororror");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <View className="flex-row items-center justify-between   px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/(signup)/firstSignup")}
          className="bg-white rounded-full h-8 w-8 items-center justify-center "
        >
          <Text> {`<-`} </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 ">
          <Image
            className="h-full w-full rounded-full"
            resizeMode="contain"
            source={require("@/assets/st.jpg")}
          />
        </TouchableOpacity>
      </View>

      {/*logo*/}
      <View className="h-32 items-center justify-center ">
        <Image
          source={require("@/assets/852.png")}
          className="h-full w-full"
          resizeMode="contain"
        />
      </View>

      {/*form*/}
      <View className="mb-4">
        <Text className="text-white text-4xl font-bold text-center mb-2 ">
          Create an account!
        </Text>
        <Text className="text-gray-400 text-center text-base mb-1">
          Sign up to access smart, personalized travel plans made for you.
        </Text>
      </View>

      <View className="px-5"></View>

      {/*fiil*/}

      <View className="px-5">
        <Text className="text-sm text-gray-300 mb-2">email adresse * </Text>
        <TextInput
          className="text-white py-4 bg bg-[#1A2235] px-5 rounded-2xl text-base mb-2"
          placeholder="example@gmail.com"
          placeholderTextColor="#64748B"
          onChangeText={setEmail}
          value={email}
        />
        <Text className="text-sm text-gray-300 mb-2"> password *</Text>
        <TextInput
          className="text-white py-4 bg bg-[#1A2235] px-5 rounded-2xl text-base mb-2"
          placeholder="@Sn123hsn#"
          placeholderTextColor="#64748B"
          onChangeText={setPassword}
          value={password}
        />
        <Text className="text-sm text-gray-300 mb-2"> confirm password * </Text>
        <TextInput
          className="text-white py-4 bg bg-[#1A2235] px-5 rounded-2xl text-base mb-2"
          placeholder="@Sn123hsn#"
          placeholderTextColor="#64748B"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />

        <View className="items-center mt-2">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#A3E635] py-4 rounded-2xl flex-row w-3/5
                   items-center justify-center active:opacity-90 "
          >
            <Text className="text-black font-semibold text-lg"> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*div*/}
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-800" />
        <Text className="text-gray-500 px-6 "> Or continue with </Text>
        <View className="flex-1 h-px bg-gray-800" />
      </View>

      {/*sociaux*/}
      <View className="flex-row gap-4 justify-center mb-4">
        <TouchableOpacity className=" p-2 bg-[#1A2235] flex-row justify-center items-center rounded-2xl ">
          <Text className="text-white text-2xl mr-2"> G</Text>
          <Text className="text-white font-medium"> Google </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-[#1A2235] flex-row justify-center items-center rounded-2xl">
          <Text className="text-white text-2xl mr-2"> A</Text>
          <Text className="text-white font-medium"> Apple </Text>
        </TouchableOpacity>
      </View>

      {/*sign up link */}

      <View className="flex-row justify-center mt-auto mb-10">
        <Text className=" text-gray-400 "> i have an account </Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/signin")}>
          <Text className="text-emerald-500 dont-semibold ">signin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
