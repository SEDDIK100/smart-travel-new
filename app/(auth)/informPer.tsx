import { db } from "@/config";
import { setUser } from "@/redux/slices/userSlices";
import { RootState } from "@/redux/stores";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useFocusEffect } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useCallback } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const getAge = (date: Date) => {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
  return age;
};

const InformPer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);

  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [person, setPerson] = useState("");
  const [visible, setIsvisible] = useState(false);
  const [age, setAge] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!currentUser) return;
      setUserName(currentUser.username ?? "");
      setPerson(currentUser.gender ?? "");
      if (currentUser.birthdate) {
        const d = new Date(currentUser.birthdate);
        setBirthday(d);
        setAge(getAge(d));
      }
    }, [currentUser])
  );

  const handleConfirm = (date: Date) => {
    setBirthday(date);
    setAge(getAge(date));
    setIsvisible(false);
  };

  const updateProfile = async () => {
    if (!currentUser?.id) return;
    await updateDoc(doc(db, "users", currentUser.id), { username: userName, birthdate: birthday.toDateString(), gender: person });
    dispatch(setUser({ user: { ...currentUser, username: userName, birthdate: birthday.toDateString(), age, gender: person }, token: null }));
    router.replace("/(auth)/Nationality");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} extraScrollHeight={100} enableOnAndroid={true} keyboardShouldPersistTaps="handled">
      <View className="flex-row items-center justify-between px-8">
        <TouchableOpacity onPress={() => router.back()} className="bg-white rounded-full h-8 w-8 items-center justify-center">
          <Text>{`<-`}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10">
          <Image className="h-full w-full rounded-full" resizeMode="contain" source={require("@/assets/st.jpg")} />
        </TouchableOpacity>
      </View>
      <View className="h-32 items-center justify-center">
        <Image source={require("@/assets/852.png")} className="h-full w-full" resizeMode="contain" />
      </View>
      <View className="px-8">
        <View className="mb-4">
          <Text className="text-white text-4xl font-bold text-center mb-2">continue with signing up !</Text>
          <Text className="text-gray-400 text-center mb-1">make yourself home ...</Text>
        </View>
        <View className="my-6">
          <Text className="text-sm text-gray-300 mb-2">user name *</Text>
          <TextInput className="text-white py-4 bg-[#1A2235] px-5 rounded-2xl mb-2" placeholder="user name" placeholderTextColor="#64748B" value={userName} onChangeText={setUserName} />
        </View>
        <View>
          <Text className="text-sm text-gray-300 mb-2">birthday *</Text>
          <View className="items-center mb-6">
            <TouchableOpacity className="justify-center border h-20 w-1/2 bg-[#1A2235] border-gray-500 rounded-xl p-4 mb-4" onPress={() => setIsvisible(true)}>
              <Text className="text-center text-lg font-semibold text-gray-500">
                {birthday ? birthday.toDateString() : <FontAwesome name="calendar" size={24} color="white" />}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal mode="date" isVisible={visible} onConfirm={handleConfirm} onCancel={() => setIsvisible(false)} />
          </View>
        </View>
        <View className="mb-6">
          <Text className="text-sm text-gray-300 mb-2">gender *</Text>
          <View className="justify-around flex-row mb-6">
            {["male", "female"].map((item) => (
              <TouchableOpacity key={item} onPress={() => setPerson(item)} className={`py-4 px-6 mx-1 w-1/3 rounded-xl border ${person === item ? "bg-neutral-950 border-green-200" : "bg-[#1A2235]"}`}>
                <Text className="text-white text-center">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="items-center mt-2">
          <TouchableOpacity onPress={updateProfile} className="bg-[#A3E635] py-4 rounded-2xl flex-row w-3/5 items-center justify-center active:opacity-90">
            <Text className="text-black font-semibold text-lg">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default InformPer;