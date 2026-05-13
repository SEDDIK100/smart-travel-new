import {
  Alert, Image, Switch, Text, TextInput, TouchableOpacity, View, ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "@/config";
import { setChats, setUser } from "@/redux/slices/userSlices";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showP, setShowP] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const Login = async () => {
    if (!email || !password) { Alert.alert("you have to fill"); return; }
    setLoading(true);
    try {
      const logedIn = await signInWithEmailAndPassword(auth, email, password);
      if (!logedIn.user.emailVerified) {
        Alert.alert("Email not verified", "Please verify your email before logging in.");
        return;
      }
      const profile = await getDoc(doc(db, "users", logedIn.user.uid));
      if (!profile.exists()) return;
      const d = profile.data();

      dispatch(setUser({
        user: {
          id: logedIn.user.uid, email, password: null,
          username: d.username || "", birthdate: d.birthdate || null, gender: d.gender || null,
          createdAt: d.createdAt, nationality: d.nationality, livingIn: d.livingIn, interrests: d.interests,
        },
        token: await logedIn.user.getIdToken(),
      }));

      const cs = await getDocs(query(collection(db, "users", logedIn.user.uid, "chats"), orderBy("createdAt", "desc")));
      dispatch(setChats(cs.docs.map((c) => ({
        id: c.id,
        createdAt: c.data().createdAt?.toDate().toISOString() ?? new Date().toISOString(),
        messages: (c.data().messages ?? []).map((m: any) => ({ ...m, createdAt: m.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString() })),
      }))));

      if (!d.username && !d.birthdate && !d.gender) router.push("/(auth)/informPer");
      else router.replace("/(tabs)/home");
    } catch { Alert.alert("invalid"); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid={true} keyboardShouldPersistTaps="handled">
      <View className="flex-row justify-between itmes-center mt-2 mb-2 px-8">
        <TouchableOpacity onPress={() => router.replace("/welcome")} className="w-10 h-10 rounded-full bg-white items-center justify-center">
          <Text> {`<-`} </Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-10 w-10">
          <Image className="rounded-full flex-1" source={require("@/assets/st.jpg")} />
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center w-full h-32 mb-4">
        <Image className="w-full h-full" resizeMode="contain" source={require("@/assets/852.png")} />
      </View>
      <View className="mb-4">
        <Text className="text-white text-4xl font-bold text-center mb-2">welcome back !</Text>
        <Text className="text-gray-400 text-center text-base mb-1">Sign in to access smart, personalized travel plans made for you.</Text>
      </View>
      <View className="px-5">
        <Text className="text-gray-300 text-sm mb-2">email adresse</Text>
        <TextInput className="bg-[#1A2235] text-white px-5 py-4 rounded-2xl mb-6" placeholder="example@gmail.com" placeholderTextColor="#64748B" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <Text className="text-gray-300 text-sm mb-2">password</Text>
        <View className="relative mb-6">
          <TextInput className="bg-[#1A2235] text-white px-5 py-4 pr-14 rounded-2xl" placeholder="@Sn123hsn#" placeholderTextColor="#64748B" secureTextEntry={!showP} value={password} onChangeText={setPassword} />
          <TouchableOpacity className="absolute right-4 top-3" onPress={() => setShowP((v) => !v)}>
            <Ionicons name={showP ? "eye-off-outline" : "eye-outline"} size={22} color="#94a3b8" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between items-center mt-2 mb-8">
          <View className="flex-row items-center gap-1">
            <Switch trackColor={{ false: "#334155", true: "#310B981" }} thumbColor="#fff" />
            <Text className="text-gray-400"> Remember me </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/(auth)/forgot")}>
            <Text className="text-emerald-500 font-medium">Forgot password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="items-center">
        <TouchableOpacity disabled={loading} onPress={Login} className="bg-[#A3E635] py-4 rounded-2xl flex-row w-3/5 items-center justify-center active:opacity-90">
          {loading ? <ActivityIndicator /> : <Text className="text-black font-semibold text-lg">Sign in</Text>}
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-gray-800" />
        <Text className="text-gray-500 px-6"> Or continue with </Text>
        <View className="flex-1 h-px bg-gray-800" />
      </View>
      <View className="flex-row gap-4 justify-center mb-4">
        <TouchableOpacity className="p-2 bg-[#1A2235] flex-row justify-center items-center rounded-2xl">
          <Text className="text-white text-2xl mr-2"> G</Text>
          <Text className="text-white font-medium"> Google </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-[#1A2235] flex-row justify-center items-center rounded-2xl">
          <Text className="text-white text-2xl mr-2"> A</Text>
          <Text className="text-white font-medium"> Apple </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-auto">
        <Text className="text-gray-400"> don t have an account </Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
          <Text className="text-emerald-500 dont-semibold">signup</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;