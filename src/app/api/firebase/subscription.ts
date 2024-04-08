import { where } from 'firebase/firestore';
import moment from 'moment';

import { add, get, update } from './controller';

// @ts-ignore
global['navigator'] = {};

/**
 * mode: 0: free, 1: subscription, 2: payment
 * limit_time: -1: no limit, = 0: stop, > 0: limit time
 * **/

export const subscription = async (email: string, info?: any) => {
  const result = await get('subscription', where('email', '==', email));
  if (!result?.data?.email) {
    add('subscription', {
      email,
      info,
      limit_time: -1,
      mode: 1,
    });
  } else {
    update('subscription', { email, info, limit_time: -1, mode: 1 }, where('email', '==', email));
  }
};

export const cancelSubscription = async (email: string, limit_time?: number) => {
  const result = await get('subscription', where('email', '==', email));
  if (result?.data?.mode === 1) {
    update(
      'subscription',
      {
        limit_time: limit_time || 0,
      },
      where('email', '==', email),
    );
  }
};

export const payment = async (email: string, info?: any) => {
  const result = await get('subscription', where('email', '==', email));
  let days = 31;

  if (result?.data?.mode === 2 && result?.data?.limit_time > 0) {
    const date1 = moment(result?.data?.limit_time);
    const date2 = moment(Date.now());
    const diffInDays = date1.diff(date2, 'days');
    days += diffInDays;
  }

  let limit_time = moment().add(days, 'days').valueOf();

  add('subscription', {
    email,
    info,
    limit_time,
    mode: 2,
  });
};
