import React from "react";
import * as Haptics from "expo-haptics";
import { useColorScheme } from "nativewind";
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
  const { colorScheme } = useColorScheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#007AFF]";
      case "danger":
        return "bg-red-500";
      case "secondary":
      default:
        return "bg-white dark:bg-[#2C2C2E]";
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

  const iconColor =
    variant === "secondary"
      ? colorScheme === "dark"
        ? "white"
        : "black"
      : "white";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`${getVariantStyles()} ${getSizeStyles()} justify-center items-center shadow-sm dark:shadow-lg transition-colors duration-500 ${className}`}
    >
      {Icon && <Icon color={iconColor} size={size === "small" ? 20 : 24} />}
      {label && (
        <Text
          className={`${variant === "secondary" ? "text-black dark:text-white" : "text-white"} text-[10px] mt-1 font-semibold text-center leading-tight px-1 transition-colors duration-500`}
          numberOfLines={2}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
