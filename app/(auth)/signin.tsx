import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlices";

const SignIn = () => {

    const dispatch = useDispatch()
    
 const Login = () =>{
    
    dispatch(setUser({user:{email:"",password:""},token:""}))


 }
   




  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d] ">
      <View className="flex-row justify-between itmes-center mt-2 mb-2 px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/welcome")}
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

      {/* logo */}
      <View className="items-center justify-center w-full h-32  mb-4">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={require("@/assets/852.png")}
        />
      </View>

      {/* form*/}

      <View className="mb-4">
        <Text className="text-white text-4xl font-bold text-center mb-2 ">
          welcome back !
        </Text>
        <Text className="text-gray-400 text-center text-base mb-1">
          
          Sign in to access smart, personalized travel plans made for you.
        </Text>
      </View>

      <View className="px-5">
        {/*email*/}
        <Text className="text-gray-300 text-sm mb-2 ">email adresse </Text>
        <TextInput
          className="bg-[#1A2235] text-white px-5 py-4 rounded-2xl text-base mb-6"
          placeholder="example@gmail.com"
          placeholderTextColor="#64748B"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/*password*/}
        <Text className="text-gray-300 text-sm mb-2">password</Text>
        <TextInput
          className="bg-[#1A2235] text-white px-5 py-4 text-base pr-14 rounded-2xl"
          placeholder="@Sn123hsn#"
          placeholderTextColor="#64748B"
          secureTextEntry
        />

        <View className="flex-row justify-between items-center mt-2 mb-8 ">
          <View className="flex-row items-center gap-1 ">
            <Switch
              className=""
              trackColor={{ false: "#334155", true: "#310B981" }}
              thumbColor="#fff"
            />
            <Text className="text-gray-400"> Remember me </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/(auth)/forgot")}>
            
            <Text className="text-emerald-500 font-medium">
              
              Forgor password
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*signiin*/}
      <View className=" items-center">
        <TouchableOpacity
          className="bg-[#A3E635] py-4 rounded-2xl flex-row w-3/5
  items-center justify-center active:opacity-90 "
        >
          <Text className="text-black font-semibold text-lg"> Sign in</Text>
        </TouchableOpacity>
      </View>

      {/*div*/}
      <View className="flex-row items-center my-6">
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

      <View className="flex-row justify-center mt-auto ">
        <Text className=" text-gray-400 "> don t have an account </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/(signup)/firstSignup")}
          className=""
        >
          <Text className="text-emerald-500 dont-semibold ">signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
