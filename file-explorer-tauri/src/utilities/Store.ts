import create from "zustand";

interface StoreState {
  dataStore: { dir: string; isFolder: boolean }[];
  pushStore: (item: { dir: string; isFolder: boolean }) => void;
  clearStore: () => void;
}

const useStore = create<StoreState>((set) => ({
  dataStore: [],
  pushStore: (item) =>
    set((state) => ({
      dataStore: [...state.dataStore, item],
    })),
  clearStore: () =>
    set(() => ({
      dataStore: [],
    })),
}));

export default useStore;
