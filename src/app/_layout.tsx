import "../i18n";
import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from "react-native-reanimated";

// Disable Reanimated strict mode to hide NativeWind v4's value read warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#121212" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="tv-selector"
          options={{
            title: "Select TV",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}
