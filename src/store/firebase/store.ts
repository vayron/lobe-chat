import { create } from 'zustand';

import { firebaseService } from '@/services/firebase';

export interface StoreState {
  createSubscriptionAction: (email: string) => void;
  subscription: {
    [key in string]?: string | number;
  };
}

const initialState = {
  subscription: {},
};

export const useStore = create<StoreState>()((set) => ({
  ...initialState,
  createSubscriptionAction: async (email) => {
    if (email) {
      const res = await firebaseService.getSubscription(email);
      if (!res.status) return;

      set({ subscription: res.data }, false);
    }
  },
}));
