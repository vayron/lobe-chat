import { create } from 'zustand';

import { firebaseService } from '@/services/firebase';

export interface StoreState {
  createSubscriptionAction: (email: string) => void;
  links: {
    svip: string;
    vip: string;
  };
  subscription: {
    email?: string;
    isPay?: boolean;
    limit_days?: number;
    limit_time?: number;
    mode?: number;
  };
}

const initialState = {
  links: {
    svip: 'https://buy.stripe.com/4gw28XfiH0E30XC9AA',
    vip: 'https://buy.stripe.com/8wM14Tb2rgD1bCgcMN',
  },
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
