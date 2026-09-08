import React from "react";
import * as Haptics from "expo-haptics";
import { View, TouchableOpacity, Text } from "react-native";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

interface DirectionalPadProps {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onOk: () => void;
}

export const DirectionalPad: React.FC<DirectionalPadProps> = ({
  onUp,
  onDown,
  onLeft,
  onRight,
  onOk,
}) => {
  const withHaptic = (action: () => void) => () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
  };

  return (
    <View className="w-64 h-64 rounded-full bg-[#2C2C2E] items-center justify-center relative shadow-xl overflow-hidden">
      {/* Segment Divider X */}
      <View className="absolute w-[140%] h-[2px] bg-[#3A3A3C] rotate-45" />
      <View className="absolute w-[140%] h-[2px] bg-[#3A3A3C] -rotate-45" />

      {/* Top Button */}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={withHaptic(onUp)}
        className="absolute top-2 w-20 h-16 justify-center items-center"
      >
        <ChevronUp color="white" size={36} />
      </TouchableOpacity>

      {/* Bottom Button */}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={withHaptic(onDown)}
        className="absolute bottom-2 w-20 h-16 justify-center items-center"
      >
        <ChevronDown color="white" size={36} />
      </TouchableOpacity>

      {/* Left Button */}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={withHaptic(onLeft)}
        className="absolute left-2 w-16 h-20 justify-center items-center"
      >
        <ChevronLeft color="white" size={36} />
      </TouchableOpacity>

      {/* Right Button */}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={withHaptic(onRight)}
        className="absolute right-2 w-16 h-20 justify-center items-center"
      >
        <ChevronRight color="white" size={36} />
      </TouchableOpacity>

      {/* Center OK Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={withHaptic(onOk)}
        className="w-24 h-24 bg-[#121212] rounded-full justify-center items-center shadow-inner border border-[#3A3A3C]"
      >
        <Text className="text-white font-bold text-xl">OK</Text>
      </TouchableOpacity>
    </View>
  );
};
