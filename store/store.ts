import { create } from 'zustand';

type Store = {
  currentImplantValue: string;
  currentImplantTitle: string;
  setCurrentImplant: (currentImplantValue: string, currentImplantTitle: string) => void;
};

const useStore = create<Store>((set) => ({
  currentImplantValue: 'ANKLE_1',
  currentImplantTitle: 'Ankle 1',
  setCurrentImplant: (currentImplantValue, currentImplantTitle) =>
    set(() => ({ currentImplantValue, currentImplantTitle })),
}));

export default useStore;
