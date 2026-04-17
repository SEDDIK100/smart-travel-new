import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
 import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE_URL = "http://192.168.1.209:8000"; // ← your laptop's LAN IP

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "user" | "bot";
 
interface Message {
  id: string;
  role: Role;
  text: string;
}
 
// ─── Typing indicator with elapsed seconds ────────────────────────────────────
const LoadingIndicator = () => {
  const [seconds, setSeconds] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <View className="flex-row items-center gap-2 px-5 pb-2">
      <ActivityIndicator size="small" color="#A3E635" />
      <Text className="text-zinc-500 text-xs">
        Assistant is thinking… {seconds}s
      </Text>
    </View>
  );
};
 
// ─── Component ────────────────────────────────────────────────────────────────
const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hello! 👋 I'm your travel assistant. How can I help you plan your trip today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const listRef = useRef<FlatList>(null);
 
  const sendMessage = useCallback(async () => {
    const question = input.trim();
    if (!question || loading) return;
 
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: question },
    ]);
    setInput("");
    setLoading(true);
 
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // ← 60s
 
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          session_id: sessionIdRef.current ?? undefined,
        }),
        signal: controller.signal,
      });
 
      clearTimeout(timeout);
      const data = await response.json();
 
      if (response.ok) {
        sessionIdRef.current = data.session_id;
        setMessages((prev) => [
          ...prev,
          { id: `${Date.now()}-bot`, role: "bot", text: data.answer },
        ]);
      } else {
        throw new Error(data.detail ?? "Unknown error");
      }
    } catch (err: any) {
      clearTimeout(timeout);
      const isTimeout = err.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-err`,
          role: "bot",
          text: isTimeout
            ? "⏱️ The server took too long to respond. Please try again."
            : `⚠️ ${err.message ?? "Could not reach the server."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);
 
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === "user";
    return (
      <View
        className={`flex-row items-end mb-3 gap-2 ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        {!isUser && (
          <View className="w-8 h-8 rounded-full bg-[#1A2235] items-center justify-center">
            <Text className="text-base">🤖</Text>
          </View>
        )}
 
        <View
          className={`max-w-[78%] px-4 py-3 ${
            isUser
              ? "bg-[#A3E635] rounded-3xl rounded-br-sm"
              : "bg-[#1A2235] rounded-3xl rounded-bl-sm"
          }`}
        >
          <Text
            className={`text-sm leading-5 ${
              isUser ? "text-[#0d0d0d] font-medium" : "text-zinc-200"
            }`}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };
 
  return (
    <SafeAreaView className="flex-1 bg-[#0d0d0d]">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-[#1A2235] gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <FontAwesome6 name="person" size={24} color="black"/>

        </TouchableOpacity>
 
        <View className="flex-1">
          <Text className="text-white text-base font-bold">Travel Assistant</Text>
          <Text className="text-zinc-500 text-xs mt-0.5">AI-powered travel guide</Text>
        </View>
 
        <View className="w-2.5 h-2.5 rounded-full bg-[#A3E635]" />
      </View>
 
      {/* Message list */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
      />
 
      {/* Typing indicator */}
      {loading && <LoadingIndicator />}
 
      {/* Input bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View className="flex-row items-end gap-3 px-4 pt-3 pb-28 bg-[#0d0d0d] border-t border-[#1A2235]">
          <TextInput
            className="flex-1 bg-[#1A2235] text-white rounded-2xl px-4 py-3 text-sm max-h-28"
            placeholder="Ask me anything about your trip…"
            placeholderTextColor="#52525b"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            multiline
          />
 
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!input.trim() || loading}
            className={`w-11 h-11 rounded-full items-center justify-center ${
              !input.trim() || loading ? "bg-[#A3E635]/40" : "bg-[#A3E635]"
            }`}
          >
           <FontAwesome6 name="person" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
 
export default ChatBot;