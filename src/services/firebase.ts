import { API_ENDPOINTS } from './_url';

class FirebaseService {
  getSubscription = async (
    email: string,
  ): Promise<{
    data: {
      email: string;
      limit_time: number;
      mode: number;
      uuid: string;
    };
    message: string;
    status: number;
  }> => {
    const res = await fetch(`${API_ENDPOINTS.subscription}?email=${encodeURIComponent(email)}`);

    return res.json();
  };
}

export const firebaseService = new FirebaseService();
