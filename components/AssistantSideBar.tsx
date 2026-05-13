import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "@/config";
import { deleteDoc, doc } from "firebase/firestore";
import { removeChat } from "@/redux/slices/userSlices";

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
  const dispatch = useDispatch();
  const chats = useSelector((s: any) => s.user.chats);

  const handleDelete = (chatId: string) => {
    Alert.alert(
      "Supprimer la conversation",
      "Cette action est définitive. Voulez-vous continuer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            try {
              await deleteDoc(doc(db, "users", uid, "chats", chatId));
              dispatch(removeChat(chatId));
            } catch (e) {
              console.log("Erreur suppression chat :", e);
              Alert.alert("Erreur", "Impossible de supprimer la conversation.");
            }
          },
        },
      ]
    );
  };

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
                <View
                  key={chat.id}
                  className="flex-row items-center mx-2 my-0.5 rounded-xl active:bg-[#1A2235]"
                >
                  {/* Zone cliquable pour ouvrir la conversation */}
                  <TouchableOpacity
                    onPress={() => { onSelectChat(chat.messages); onClose(); }}
                    className="flex-1 px-4 py-3"
                  >
                    <Text numberOfLines={1} className="text-zinc-300 text-sm">
                      {chat.messages?.[0]?.text ?? "Conversation vide"}
                    </Text>
                  </TouchableOpacity>

                  {/* ✅ Bouton de suppression */}
                  <TouchableOpacity
                    onPress={() => handleDelete(chat.id)}
                    className="px-3 py-3"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <FontAwesome6 name="trash" size={14} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
};