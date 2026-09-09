import { useColorScheme } from "nativewind";
import { Send, X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

interface KeyboardModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export const KeyboardModal: React.FC<KeyboardModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setText("");
      // Add a slight delay to ensure modal is visible before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  const handleSubmit = () => {
    if (text.trim().length > 0) {
      onSubmit(text);
      setText("");
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/60"
      >
        <View className="bg-[#F2F2F7] dark:bg-[#1C1C1E] p-4 rounded-t-3xl border-t border-gray-200 dark:border-[#2C2C2E] transition-colors duration-500">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black dark:text-white font-bold text-lg px-2 transition-colors duration-500">
              {t("keyboard.title", "TV Keyboard")}
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <X color={colorScheme === "dark" ? "white" : "black"} size={24} />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center bg-white dark:bg-[#2C2C2E] rounded-2xl p-2 border border-gray-200 dark:border-[#3A3A3C] transition-colors duration-500">
            <TextInput
              ref={inputRef}
              className="flex-1 text-black dark:text-white text-base px-3 py-2 transition-colors duration-500"
              placeholder={t(
                "keyboard.placeholder",
                "Type text to send to TV...",
              )}
              placeholderTextColor={colorScheme === "dark" ? "#A0A0A0" : "#666"}
              value={text}
              onChangeText={setText}
              onSubmitEditing={handleSubmit}
              returnKeyType="send"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={handleSubmit}
              className={`p-3 rounded-xl ml-2 ${
                text.trim().length > 0
                  ? "bg-[#007AFF]"
                  : "bg-gray-300 dark:bg-[#3A3A3C]"
              } transition-colors duration-300`}
              disabled={text.trim().length === 0}
            >
              <Send color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
