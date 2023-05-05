import { create } from 'zustand';

/*
  Zustand store for global state management
*/
type Store = {
  currentImplantValue: string;
  currentImplantTitle: string;
  isAuthDone: boolean;
  setCurrentImplant: (currentImplantValue: string, currentImplantTitle: string) => void;
  updateAuthDone: (isAuthDone: boolean) => void;
};

/*
  Update state methods implementation
*/
const useStore = create<Store>((set) => ({
  currentImplantValue: 'ankle',
  currentImplantTitle: 'Ankle I',
  isAuthDone: false,
  setCurrentImplant: (currentImplantValue, currentImplantTitle) =>
    set((state: any) => ({ ...state, currentImplantValue, currentImplantTitle })),
  updateAuthDone: (isAuthDone) => set((state: any) => ({ ...state, isAuthDone })),
}));

export default useStore;
