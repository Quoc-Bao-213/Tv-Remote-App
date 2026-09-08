import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TVBrand = "samsung" | "lg" | "sony" | null;

interface AppState {
  selectedTVBrand: TVBrand;
  samsungTvIp: string | null;
  samsungTvMac: string | null;
  hasPaired: boolean;
  setSelectedTVBrand: (brand: TVBrand) => void;
  setSamsungTvInfo: (ip: string, mac?: string) => void;
  setHasPaired: (paired: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedTVBrand: null,
      samsungTvIp: null,
      samsungTvMac: null,
      hasPaired: false,
      setSelectedTVBrand: (brand) => set({ selectedTVBrand: brand }),
      setSamsungTvInfo: (ip, mac) =>
        set((state) => ({
          samsungTvIp: ip,
          samsungTvMac: mac || state.samsungTvMac,
        })),
      setHasPaired: (paired) => set({ hasPaired: paired }),
    }),
    {
      name: "samsung-remote-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
