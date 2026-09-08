import React from "react";
import { Tv } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface PairingModalProps {
  visible: boolean;
  onCancel: () => void;
}

export const PairingModal: React.FC<PairingModalProps> = ({
  visible,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/80 justify-center items-center px-6">
        <View className="bg-[#2C2C2E] w-full rounded-3xl p-6 items-center shadow-2xl border border-[#3A3A3C]">
          <View className="w-16 h-16 bg-[#007AFF]/20 rounded-full justify-center items-center mb-4">
            <Tv color="#007AFF" size={32} />
          </View>

          <Text className="text-white text-xl font-bold mb-2 text-center">
            {t("pairing.title")}
          </Text>

          <Text className="text-[#A0A0A0] text-center mb-8 leading-6">
            {t("pairing.message")}
          </Text>

          <View className="flex-row items-center justify-center mb-8">
            <ActivityIndicator size="small" color="#007AFF" />
            <Text className="text-[#007AFF] ml-3 font-semibold">
              {t("pairing.waiting")}
            </Text>
          </View>

          <TouchableOpacity
            className="w-full bg-[#121212] py-4 rounded-xl border border-[#3A3A3C] items-center"
            onPress={onCancel}
          >
            <Text className="text-white font-semibold text-lg">
              {t("pairing.cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
