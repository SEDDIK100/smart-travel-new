import { auth, db } from "@/config";
import { RootState } from "@/redux/stores";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const InformPer = () => {
  const [userName, setUserName] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [person, setPerson] = useState<string | null>(null);
  const [visible, setIsvisible] = useState(false);

  const handleConfirm = (date: Date) => {
    setBirthday(date);
    setIsvisible(!visible);
  };

  const currrentUser = useSelector((state:RootState )=>{state.user.user})
  console.log("currentuser", currrentUser)
  const updateProfile = async()=>{
    console.log('id user', currrentUser?.id)
  await updateDoc(doc(db, "users", currrentUser?.id), {
      username: userName,
      birthdate: birthday?.toDateString(),
      gender: person 
    })


    

    router.replace("/(tabs)/home")

  }




  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <View className="flex-row items-center justify-between   px-8 ">
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/signin")}
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
      <View className="px-8">
        <View className="mb-4">
          <Text className="text-white text-4xl font-bold text-center mb-2 ">
            continue with signing up !
          </Text>
          <Text className="text-gray-400 text-center text-base mb-1">
            make yourself home ...
          </Text>
        </View>

        {/*form*/}
        <View className="my-6">
          <Text className="te text-sm text-gray-300 mb-2">user name *</Text>
          <TextInput
            className="text-white py-4 bg bg-[#1A2235] px-5 rounded-2xl text-base mb-2"
            placeholder="user name"
            placeholderTextColor="#64748B"

            value={userName}
            onChangeText={setUserName}
          />
        </View>

        {/* birth */}

        <View>
          <Text className="te text-sm text-gray-300 mb-2">birthday *</Text>
          <View className="items-center mb-6 ">
            <TouchableOpacity
              className=" justify-center border h-20  w-1/2 bg-[#1A2235] border-gray-500 rounded-xl p-4 mb-4"
              onPress={() => setIsvisible(!visible)}
            >
              <Text className="text-center text-lg font-semibold text-gray-500">
                {birthday ? (
                  birthday.toDateString()
                ) : (
                  <FontAwesome name="calendar" size={24} color="white" />
                )}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              mode="date"
              isVisible={visible}
              onConfirm={handleConfirm}
              onCancel={() => setIsvisible(!visible)}
            />
          </View>
        </View>

        {/* person*/}
        <View className="mb-6">
          <Text className="te text-sm text-gray-300 mb-2">gender *</Text>
          <View className="justify-around flex-row mb-6 ">
            {["male", "female"].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setPerson(item)}
                className={`py-4 px-6 mx-1 w-1/3 rounded-xl border ${person === item ? " bg-neutral-950 border-green-200 " : "bg-[#1A2235]"}`}
              >
                <Text
                  className={`text-center ${person === item ? "text-white" : "text-white"}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/*ere*/}
        <View className="items-center mt-2">
          <TouchableOpacity
            onPress={updateProfile}
            className="bg-[#A3E635] py-4 rounded-2xl flex-row w-3/5
                             items-center justify-center active:opacity-90 "
          >
            <Text className="text-black font-semibold text-lg"> Next </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InformPer;
