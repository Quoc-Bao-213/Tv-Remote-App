# 📺 TV Remote App

A modern, fast, and responsive iOS & Android remote control application built with **React Native**, **Expo SDK 57**, and **NativeWind v4** (Tailwind CSS). 
> **Note:** The app is designed to support multiple smart TV brands. However, in this initial version (v1.0), it exclusively supports **Samsung Smart TVs**.

---

## ✨ Features

- **Local Network Control**: Connects directly to your Samsung TV over Wi-Fi via WebSockets.
- **Auto-Fallback Mechanism**: Automatically handles secure (`wss://`, port 8002) and non-secure (`ws://`, port 8001) WebSocket connections for maximum compatibility across different Tizen TV models.
- **Modern UI/UX**: Clean, dark-mode focused interface with micro-interactions.
- **Haptic Feedback**: Real-time tactile vibration feedback on button presses for a physical remote feel.
- **App Shortcuts**: Dedicated "Deep Link" buttons to launch Netflix and YouTube instantly.
- **Multi-language Support**: Fully localized in English (EN) and Vietnamese (VN).
- **Persistent Storage**: Automatically remembers your last connected TV's IP address.
- **Multi-Brand Architecture**: The UI includes a TV Selector screen preparing for future support of LG, Sony, and other brands (currently displaying "Coming Soon").

---

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- **Expo Go** application installed on your physical device ([iOS](https://apps.apple.com/us/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)).

---

## 💻 Installation

1. **Clone or Download** this repository to your local machine.
2. Open a terminal and navigate to the project directory:
   ```bash
   cd tv-remote-app
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
   _(Note: The app heavily utilizes Expo's auto-linking. Avoid using standard `npm install <package>` for native modules without `npx expo install` to prevent version mismatch)._

---

## 🏃 Running the App

1. **Start the Expo Development Server**:

   ```bash
   npm start
   ```

   _If you encounter caching issues, run `npm start -- -c` to clear the bundler cache._

2. **Connect your Phone**:
   - Open your phone's Camera app (iOS) or a QR Scanner (Android).
   - Scan the QR code displayed in the terminal.
   - The app will automatically build and open inside Expo Go.

---

## 🎮 How to Use (Pairing with your TV)

> **IMPORTANT**: Your phone and your Samsung TV **MUST** be connected to the exact same Wi-Fi network.

1. **Find your TV's IP Address**:
   - On your TV, navigate to: `Settings > General > Network > Network Status > IP Settings`.
   - Note down the IP address (e.g., `192.168.1.5`).

2. **Connect via the App**:
   - Open the Remote app on your phone.
   - Enter the IP Address into the input field and tap **Connect**.

3. **Authorize the Connection (First Time Only)**:
   - Look at your physical TV screen. A prompt will appear at the top right corner asking for permission to allow a new device ("iOS Remote").
   - Use your physical TV remote to select **Allow** or **OK**.
   - Your phone is now paired! The app will remember this connection for next time.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React Native + Expo Router (File-based navigation)
- **Styling**: NativeWind v4 (Tailwind CSS)
- **State Management**: Zustand + AsyncStorage
- **Localization**: `react-i18next` + `expo-localization`
- **Icons**: `lucide-react-native`

---

## 🐛 Troubleshooting

- **App says "Connected" but buttons don't work**: Ensure you clicked "Allow" on the TV screen. If you missed the prompt, go to `Settings > General > External Device Manager > Device Connection Manager > Device List` on your TV, delete your phone from the list, and try connecting again.
- **WebSocket Error / Connection Timeout**: Verify that your phone is not on a mobile data connection or a Guest Wi-Fi network with AP Isolation enabled.

---

_Designed and engineered for a seamless smart home experience._
