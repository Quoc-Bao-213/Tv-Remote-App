import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store/useAppStore";
import { Tv, ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function TvSelectorScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setSelectedTVBrand } = useAppStore();

  const handleSelectSamsung = () => {
    setSelectedTVBrand("samsung");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7] dark:bg-[#121212] transition-colors duration-500">
      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="text-black dark:text-white text-2xl font-bold mb-8 transition-colors duration-500">
          {t("tvSelector.title")}
        </Text>

        {/* Samsung (Active) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSelectSamsung}
          className="flex-row items-center bg-white dark:bg-[#2C2C2E] p-5 rounded-2xl mb-4 border border-[#007AFF]/30 shadow-sm transition-colors duration-500"
        >
          <View className="w-12 h-12 bg-[#007AFF]/10 dark:bg-[#007AFF]/20 rounded-full justify-center items-center mr-4 transition-colors duration-500">
            <Tv color="#007AFF" size={24} />
          </View>
          <Text className="flex-1 text-black dark:text-white text-lg font-semibold transition-colors duration-500">
            {t("tvSelector.samsung")}
          </Text>
          <ChevronRight color="#007AFF" size={24} />
        </TouchableOpacity>

        {/* LG (Disabled) */}
        <View className="flex-row items-center bg-gray-100 dark:bg-[#2C2C2E]/50 p-5 rounded-2xl mb-4 transition-colors duration-500">
          <View className="w-12 h-12 bg-gray-200 dark:bg-[#3A3A3C] rounded-full justify-center items-center mr-4 transition-colors duration-500">
            <Tv color="#A0A0A0" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-gray-500 dark:text-[#A0A0A0] text-lg font-semibold transition-colors duration-500">
              {t("tvSelector.lg")}
            </Text>
            <Text className="text-gray-400 dark:text-[#A0A0A0] text-xs transition-colors duration-500">
              {t("tvSelector.comingSoon")}
            </Text>
          </View>
        </View>

        {/* Sony (Disabled) */}
        <View className="flex-row items-center bg-gray-100 dark:bg-[#2C2C2E]/50 p-5 rounded-2xl mb-4 transition-colors duration-500">
          <View className="w-12 h-12 bg-gray-200 dark:bg-[#3A3A3C] rounded-full justify-center items-center mr-4 transition-colors duration-500">
            <Tv color="#A0A0A0" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-gray-500 dark:text-[#A0A0A0] text-lg font-semibold transition-colors duration-500">
              {t("tvSelector.sony")}
            </Text>
            <Text className="text-gray-400 dark:text-[#A0A0A0] text-xs transition-colors duration-500">
              {t("tvSelector.comingSoon")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
