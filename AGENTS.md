# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

# React Native & Expo Best Practices for this Project

When generating code, updating features, or refactoring, ALWAYS strictly adhere to the following best practices based on the current architecture:

## 1. Directory Structure (Feature-Based)
The project follows a modular, feature-based directory structure inside `src/`.
- `src/app/`: Expo Router screens and layouts. These files must be lowercase, kebab-case (e.g., `index.tsx`, `tv-selector.tsx`, `_layout.tsx`).
- `src/components/`: Reusable, generic UI components (e.g., `RemoteButton.tsx`, `PairingModal.tsx`).
- `src/features/`: Feature-specific logic, hooks, and constants (e.g., `src/features/samsung-tv/useSamsungTV.ts`). Do not mix feature logic into generic components.
- `src/store/`: Global state management using Zustand (e.g., `useAppStore.ts`).
- `src/i18n/`: Localization configurations and JSON dictionaries.

## 2. File Naming Conventions
- **React Components**: `PascalCase.tsx` (e.g., `DirectionalPad.tsx`).
- **Hooks & Stores**: `camelCase.ts` (e.g., `useAppStore.ts`, `useSamsungTV.ts`).
- **Constants & Utilities**: `kebab-case.ts` (e.g., `tv-keys.ts`).
- **Expo Router Pages**: `kebab-case.tsx` (e.g., `tv-selector.tsx`).

## 3. Variable & Component Naming
- **Components**: Use `PascalCase` for component declarations.
- **Hooks**: Always prefix with `use` (e.g., `useSamsungTV`).
- **Event Handlers**: Prefix functions triggered by user interaction with `handle` (e.g., `handleConnect`, `handleAppLaunch`). Props representing events should be prefixed with `on` (e.g., `onPress`, `onCancel`).
- **Booleans**: Prefix with `is`, `has`, or `should` (e.g., `isConnected`, `hasPaired`, `isConnecting`).
- **Constants**: Use `UPPER_SNAKE_CASE` for global/file-level constants (e.g., `TV_KEYS`, `APP_NAME_BASE64`).

## 4. Styling (NativeWind v4)
- Exclusively use **NativeWind v4** (Tailwind CSS classes) via the `className` prop for all styling.
- **Avoid `StyleSheet.create`** unless absolutely necessary for complex animations or dynamic inline styles that Tailwind cannot handle.
- For layouts that need padding/margins on screens with notches, use `SafeAreaView` from `react-native-safe-area-context`, NOT the deprecated one from `react-native`.

## 5. State Management
- Use **Zustand** for all global state management. Avoid using React Context.
- For persistent data (like IP addresses, MAC addresses, and user preferences), use Zustand's `persist` middleware integrated with `@react-native-async-storage/async-storage`.

## 6. Localization
- All user-facing text must be internationalized using `react-i18next`.
- Do not hardcode English/Vietnamese strings directly in the UI. Always use `const { t } = useTranslation();` and add the keys to `en.json` and `vi.json`.
