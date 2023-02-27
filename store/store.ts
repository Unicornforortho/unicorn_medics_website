import { create } from 'zustand';

type Store = {
  currentImplantValue: string;
  currentImplantTitle: string;
  isAuthDone: boolean;
  setCurrentImplant: (currentImplantValue: string, currentImplantTitle: string) => void;
  updateAuthDone: (isAuthDone: boolean) => void;
};

const useStore = create<Store>((set) => ({
  currentImplantValue: 'ankle_one',
  currentImplantTitle: 'Ankle 1',
  isAuthDone: false,
  setCurrentImplant: (currentImplantValue, currentImplantTitle) =>
    set((state: any) => ({ ...state, currentImplantValue, currentImplantTitle })),
  updateAuthDone: (isAuthDone) => set((state: any) => ({ ...state, isAuthDone })),
}));

export default useStore;
