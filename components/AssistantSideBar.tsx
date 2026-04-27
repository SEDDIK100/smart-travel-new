import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export const Sidebar = ({
  visible,
  onClose,
  onSelectChat,
  onNewChat,
}: {
  visible: boolean;
  onClose: () => void;
  onSelectChat: (msgs: any[]) => void;
  onNewChat: () => void;
}) => {
  const chats = useSelector((s: any) => s.user.chats);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50" onPress={onClose}>
        <SafeAreaView className="flex-1 w-4/5 bg-[#111827] border-r border-[#1A2235]">
          <Pressable>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1A2235]">
              <Text className="text-white font-bold text-base">Historique</Text>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome6 name="xmark" size={18} color="#71717a" />
              </TouchableOpacity>
            </View>

            {/* New Chat */}
            <TouchableOpacity
              onPress={() => { onNewChat(); onClose(); }}
              className="flex-row items-center gap-2 mx-3 my-3 px-4 py-3 bg-[#1A2235] rounded-xl border border-[#A3E635]"
            >
              <FontAwesome6 name="plus" size={13} color="#A3E635" />
              <Text className="text-[#A3E635] font-semibold text-sm">Nouvelle discussion</Text>
            </TouchableOpacity>
          </Pressable>

          {/* Chat List */}
          {chats.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-zinc-600 text-sm">Aucune conversation</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
              {chats.map((chat: any) => (
                <TouchableOpacity
                  key={chat.id}
                  onPress={() => { onSelectChat(chat.messages); onClose(); }}
                  className="px-4 py-3 mx-2 my-0.5 rounded-xl active:bg-[#1A2235]"
                >
                  <Text numberOfLines={1} className="text-zinc-300 text-sm">
                    {chat.messages?.[0]?.text ?? "Conversation vide"}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
};