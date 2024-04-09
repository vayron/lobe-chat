import { create } from 'zustand';

import { firebaseService } from '@/services/firebase';

export interface StoreState {
  createSubscriptionAction: (email: string) => void;
  subscription: {
    email?: string;
    isPay?: boolean;
    limit_days?: number;
    limit_time?: number;
    mode?: number;
  };
}

const initialState = {
  subscription: {},
};

export const useFirebaseStore = create<StoreState>()((set) => ({
  ...initialState,
  createSubscriptionAction: async (email) => {
    if (email) {
      const res = await firebaseService.getSubscription(email);
      if (!res.status) return;
      set({ subscription: res.data }, false);
    }
  },
}));
