import { create } from 'zustand';

type Store = {
  currentImplantValue: string;
  currentImplantTitle: string;
  setCurrentImplant: (currentImplantValue: string, currentImplantTitle: string) => void;
};

const useStore = create<Store>((set) => ({
  currentImplantValue: 'ankle_one',
  currentImplantTitle: 'Ankle 1',
  setCurrentImplant: (currentImplantValue, currentImplantTitle) =>
    set(() => ({ currentImplantValue, currentImplantTitle })),
}));

export default useStore;
