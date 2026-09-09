import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store/useAppStore";
import { TV_KEYS } from "../features/samsung-tv/tv-keys";
import { RemoteButton } from "../components/RemoteButton";
import { PairingModal } from "../components/PairingModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { DirectionalPad } from "../components/DirectionalPad";
import { useSamsungTV } from "../features/samsung-tv/useSamsungTV";
import {
  View,
  Text,
  Modal,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Tv,
  Sun,
  Menu,
  Home,
  Moon,
  Power,
  Settings,
  ArrowLeft,
} from "lucide-react-native";

export default function RemoteScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { selectedTVBrand, samsungTvIp, setSamsungTvInfo } = useAppStore();
  const {
    isConnected,
    isConnecting,
    pairingRequired,
    connect,
    disconnect,
    sendKey,
    launchApp,
    setPairingRequired,
    connectionError,
    setConnectionError,
  } = useSamsungTV();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [ipInput, setIpInput] = useState(samsungTvIp || "");

  // Redirect to selector if no brand selected
  useEffect(() => {
    if (!selectedTVBrand) {
      router.push("/tv-selector");
    }
  }, [selectedTVBrand]);

  const handleConnect = () => {
    setSamsungTvInfo(ipInput);
    connect(ipInput);
  };

  useEffect(() => {
    if (connectionError) {
      // Delay the alert slightly to ensure the connecting Modal has completely
      // finished fading out. On iOS, presenting an Alert while a Modal is dismissing
      // causes the Alert to be silently dropped.
      const timer = setTimeout(() => {
        Alert.alert(t("remote.connectionFailed"), t("remote.connectionError"), [
          { text: t("remote.ok"), onPress: () => setConnectionError(false) },
        ]);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [connectionError, t]);

  const handleDisconnect = () => {
    disconnect();
    setSamsungTvInfo(""); // clear from store
    setIpInput("");
  };

  const getStatusText = () => {
    if (isConnecting) return t("remote.connecting");
    if (isConnected) return t("remote.connected");
    return t("remote.disconnected");
  };

  const getStatusColor = () => {
    if (isConnecting) return "text-yellow-500";
    if (isConnected) return "text-green-500";
    return "text-red-500";
  };

  const handleKeyPress = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    sendKey(key);
  };

  const handleAppLaunch = (appId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    launchApp(appId);
  };

  if (selectedTVBrand !== "samsung") {
    return (
      <SafeAreaView className="flex-1 bg-[#F2F2F7] dark:bg-[#121212] justify-center items-center transition-colors duration-500">
        <Text className="text-black dark:text-white transition-colors duration-500">
          Please select a TV first
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7] dark:bg-[#121212] transition-colors duration-500">
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-gray-200 dark:border-[#2C2C2E] transition-colors duration-500">
        <TouchableOpacity
          onPress={() => router.push("/tv-selector")}
          className="flex-row items-center"
        >
          <Tv color="#007AFF" size={24} />
          <Text className="text-[#007AFF] font-bold ml-2 text-lg">Samsung</Text>
        </TouchableOpacity>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={toggleColorScheme}
            className="bg-white dark:bg-[#2C2C2E] p-2 rounded-full border border-gray-200 dark:border-[#3A3A3C] mr-3 transition-colors duration-500"
          >
            {colorScheme === "dark" ? (
              <Sun color="white" size={16} />
            ) : (
              <Moon color="black" size={16} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const nextLang = i18n.language?.startsWith("en") ? "vi" : "en";
              i18n.changeLanguage(nextLang);
            }}
            className="bg-white dark:bg-[#2C2C2E] px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#3A3A3C] mr-3 transition-colors duration-500"
          >
            <Text className="text-black dark:text-white font-bold text-xs transition-colors duration-500">
              {i18n.language?.startsWith("vi") ? "VN" : "EN"}
            </Text>
          </TouchableOpacity>

          {isConnected ? (
            <TouchableOpacity
              onPress={handleDisconnect}
              className="bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/50"
            >
              <Text className="text-red-500 text-xs font-bold">
                {t("remote.disconnectBtn")}
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${isConnecting ? "bg-yellow-500" : "bg-red-500"}`}
              />
              <Text className={`text-xs font-semibold ${getStatusColor()}`}>
                {getStatusText()}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* IP Setup - Only show if disconnected */}
      {!isConnected && (
        <View className="px-6 py-4 bg-white dark:bg-[#1C1C1E] border-b border-gray-200 dark:border-[#2C2C2E] transition-colors duration-500">
          <Text className="text-gray-500 dark:text-[#A0A0A0] text-xs mb-2 transition-colors duration-500">
            {t("remote.ipAddress")}
          </Text>
          <View className="flex-row">
            <TextInput
              className="flex-1 bg-gray-100 dark:bg-[#2C2C2E] text-black dark:text-white p-3 rounded-xl mr-3 font-mono transition-colors duration-500"
              placeholder="192.168.1.x"
              placeholderTextColor="#666"
              value={ipInput}
              onChangeText={setIpInput}
              keyboardType="numbers-and-punctuation"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              className="bg-[#007AFF] justify-center px-6 rounded-xl"
              onPress={handleConnect}
            >
              <Text className="text-white font-bold">
                {t("remote.connectBtn")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Remote Body */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 24,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Controls */}
        <View className="flex-row justify-between w-full mb-10 px-4">
          <RemoteButton
            icon={Power}
            variant="danger"
            label={t("remote.power")}
            onPress={() => sendKey(TV_KEYS.POWER)}
          />
          <RemoteButton
            icon={Menu}
            label={t("remote.source")}
            onPress={() => sendKey(TV_KEYS.SOURCE)}
          />
          <RemoteButton
            icon={Settings}
            label={t("remote.settings")}
            onPress={() => sendKey("KEY_MENU")}
          />
        </View>

        {/* Directional Pad */}
        <View className="mb-10">
          <DirectionalPad
            onUp={() => sendKey(TV_KEYS.UP)}
            onDown={() => sendKey(TV_KEYS.DOWN)}
            onLeft={() => sendKey(TV_KEYS.LEFT)}
            onRight={() => sendKey(TV_KEYS.RIGHT)}
            onOk={() => sendKey(TV_KEYS.ENTER)}
          />
        </View>

        {/* App Shortcuts */}
        <View className="flex-row justify-center w-full mb-8">
          <TouchableOpacity
            className="bg-[#E50914] w-28 h-12 rounded-xl justify-center items-center shadow-lg mr-4"
            onPress={() => handleAppLaunch("11101200001")}
          >
            <Text className="text-white font-black text-base tracking-widest">
              NETFLIX
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FF0000] w-28 h-12 rounded-xl justify-center items-center shadow-lg"
            onPress={() => handleAppLaunch("111299001912")}
          >
            <Text className="text-white font-bold text-base tracking-widest">
              YouTube
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Controls (Vol / CH) */}
        <View className="flex-row justify-between w-full px-4 mb-8">
          <View className="bg-white dark:bg-[#2C2C2E] rounded-full items-center p-2 shadow-lg transition-colors duration-500">
            <TouchableOpacity
              className="p-4"
              onPress={() => handleKeyPress(TV_KEYS.VOL_UP)}
            >
              <Text className="text-black dark:text-white text-xl font-bold transition-colors duration-500">
                +
              </Text>
            </TouchableOpacity>
            <View className="py-2">
              <Text className="text-gray-500 dark:text-[#A0A0A0] text-xs font-bold transition-colors duration-500">
                VOL
              </Text>
            </View>
            <TouchableOpacity
              className="p-4"
              onPress={() => handleKeyPress(TV_KEYS.VOL_DOWN)}
            >
              <Text className="text-black dark:text-white text-xl font-bold transition-colors duration-500">
                -
              </Text>
            </TouchableOpacity>
          </View>

          <View className="justify-between py-2">
            <RemoteButton
              icon={Home}
              onPress={() => handleKeyPress(TV_KEYS.HOME)}
            />
            <RemoteButton
              icon={ArrowLeft}
              onPress={() => handleKeyPress(TV_KEYS.BACK)}
            />
          </View>

          <View className="bg-white dark:bg-[#2C2C2E] rounded-full items-center p-2 shadow-lg transition-colors duration-500">
            <TouchableOpacity
              className="p-4"
              onPress={() => handleKeyPress(TV_KEYS.CH_UP)}
            >
              <Text className="text-black dark:text-white text-xl font-bold transition-colors duration-500">
                +
              </Text>
            </TouchableOpacity>
            <View className="py-2">
              <Text className="text-gray-500 dark:text-[#A0A0A0] text-xs font-bold transition-colors duration-500">
                CH
              </Text>
            </View>
            <TouchableOpacity
              className="p-4"
              onPress={() => handleKeyPress(TV_KEYS.CH_DOWN)}
            >
              <Text className="text-black dark:text-white text-xl font-bold transition-colors duration-500">
                -
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <PairingModal
        visible={pairingRequired}
        onCancel={() => {
          setPairingRequired(false);
          disconnect();
        }}
      />

      {/* Connecting Overlay */}
      <Modal visible={isConnecting} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center px-6">
          <View className="bg-white dark:bg-[#2C2C2E] w-full rounded-3xl p-8 items-center shadow-2xl border border-gray-200 dark:border-[#3A3A3C] transition-colors duration-500">
            <ActivityIndicator size="large" color="#007AFF" className="mb-4" />
            <Text className="text-black dark:text-white text-lg font-bold text-center mb-2 transition-colors duration-500">
              {t("remote.connecting")}
            </Text>
            <Text className="text-gray-500 dark:text-[#A0A0A0] text-center leading-6 transition-colors duration-500">
              {t("remote.connectingWait")}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
