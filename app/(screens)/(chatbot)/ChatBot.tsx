import { Sidebar } from "@/components/AssistantSideBar";
import { auth, db } from "@/config";
import { API_BASE_URL } from "@/api";
import { setChats } from "@/redux/slices/userSlices";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { addDoc, arrayUnion, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/redux/stores";

const WELCOME = { id: "welcome", role: "bot", text: "Hello! 👋 How can I help you plan your trip today?" };

export default function ChatBot() {
  const dispatch    = useAppDispatch();
  const [messages,     setMessages]     = useState([WELCOME]);
  const [input,        setInput]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const chatIdRef = useRef<string | null>(null);
  const listRef   = useRef<FlatList>(null);

  const uid = () => auth.currentUser?.uid;

  // ── Firestore helpers ──────────────────────────────────────────
  const loadChats = async () => {
    if (!uid()) return;
    const snap = await getDocs(query(collection(db, "users", uid()!, "chats"), orderBy("createdAt", "desc"))).catch(() => null);
    if (!snap) return;
    dispatch(setChats(snap.docs.map((d) => ({
      id: d.id,
      createdAt: d.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      messages:  (d.data().messages || []).map((m: any) => ({
        role: m.role, text: m.text,
        createdAt: m.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      })),
    }))));
  };

  const saveMsg = async (msg: { role: string; text: string }) => {
    if (!uid()) return;
    const entry = { role: msg.role, text: msg.text, createdAt: new Date() };
    if (!chatIdRef.current) {
      const ref = await addDoc(collection(db, "users", uid()!, "chats"), { createdAt: serverTimestamp(), messages: [entry] }).catch(() => null);
      if (ref) chatIdRef.current = ref.id;
    } else {
      await updateDoc(doc(db, "users", uid()!, "chats", chatIdRef.current), { messages: arrayUnion(entry) }).catch(() => null);
    }
    loadChats();
  };

  useEffect(() => { loadChats(); }, []);

  // ── Send ───────────────────────────────────────────────────────
  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;

    const userMsg = { id: Date.now().toString(), role: "user", text: q };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    await saveMsg(userMsg);

    try {
      const res  = await fetch(`${API_BASE_URL}/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q }) });
      const data = await res.json();
      const botMsg = { id: `${Date.now()}-bot`, role: "bot", text: res.ok ? data.answer : "Error" };
      setMessages((p) => [...p, botMsg]);
      await saveMsg(botMsg);
    } catch {
      setMessages((p) => [...p, { id: `${Date.now()}-err`, role: "bot", text: "⚠️ Connection error." }]);
    } finally {
      setLoading(false);
    }
  };

  // ── UI ─────────────────────────────────────────────────────────
  return (
    <View className="flex-1 bg-[#0d0d0d]">
      <SafeAreaView className="flex-1" edges={["top"]}>

        <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A2235]">
          <TouchableOpacity onPress={() => setSidebarOpen(true)}>
            <FontAwesome6 name="bars" size={20} color="#A3E635" />
          </TouchableOpacity>
          <Text className="text-white font-bold">Travel Assistant</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View className={`flex-row mb-3 ${item.role === "user" ? "justify-end" : "justify-start"}`}>
              <View className={`max-w-[78%] px-4 py-3 rounded-3xl ${item.role === "user" ? "bg-[#A3E635]" : "bg-[#1A2235]"}`}>
                <Text className={item.role === "user" ? "text-black" : "text-zinc-200"}>{item.text}</Text>
              </View>
            </View>
          )}
        />

        {loading && <ActivityIndicator color="#A3E635" className="my-2" />}

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View className="flex-row items-center px-3 py-3 border-t border-[#1A2235]">
            <TextInput
              className="flex-1 bg-[#1A2235] text-white px-4 rounded-2xl"
              style={{ minHeight: 48 }}
              placeholder="Ask something..."
              placeholderTextColor="#555"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
            />
            <TouchableOpacity onPress={send} className="ml-2 bg-[#A3E635] rounded-2xl items-center justify-center" style={{ width: 48, height: 48 }}>
              <FontAwesome6 name="paper-plane" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView>

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectChat={(msgs) => { setMessages(msgs.map((m: any, i: number) => ({ id: `h-${i}`, role: m.role, text: m.text }))); chatIdRef.current = null; }}
        onNewChat={() => { setMessages([WELCOME]); chatIdRef.current = null; }}
      />
    </View>
  );
}