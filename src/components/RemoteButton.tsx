import React from "react";
import * as Haptics from "expo-haptics";
import { LucideIcon } from "lucide-react-native";
import { TouchableOpacity, Text } from "react-native";

interface RemoteButtonProps {
  onPress: () => void;
  label?: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  className?: string;
}

export const RemoteButton: React.FC<RemoteButtonProps> = ({
  onPress,
  label,
  icon: Icon,
  variant = "secondary",
  size = "medium",
  className = "",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#007AFF]";
      case "danger":
        return "bg-red-500";
      case "secondary":
      default:
        return "bg-[#2C2C2E]";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "w-12 h-12 rounded-full";
      case "large":
        return "w-24 h-24 rounded-full";
      case "medium":
      default:
        return "w-16 h-16 rounded-full";
    }
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`${getVariantStyles()} ${getSizeStyles()} justify-center items-center shadow-lg ${className}`}
    >
      {Icon && <Icon color="white" size={size === "small" ? 20 : 24} />}
      {label && (
        <Text
          className="text-white text-[10px] mt-1 font-semibold text-center leading-tight px-1"
          numberOfLines={2}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
