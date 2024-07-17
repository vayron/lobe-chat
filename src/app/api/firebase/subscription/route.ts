import { where } from 'firebase/firestore';
import moment from 'moment';
import { cookies } from 'next/headers';

import { get, update } from '../controller';

// @ts-ignore
global['navigator'] = {};

export const runtime = 'edge';

export const GET = async (req: Request, res: Response) => {
  const email = new URL(req.url).searchParams.get('email');
  let result = {} as any;
  try {
    result = await get('subscription', where('email', '==', email));

    // 有效期内
    if (result?.data?.limit_time - Date.now() > 0) {
      const date1 = moment(result.data.limit_time);
      const date2 = moment(Date.now());
      const diffInDays = date1.diff(date2, 'days');
      result.data.limit_days = diffInDays + 1;

      // 非订阅模式下，更新时间过期
    } else if (result?.data?.limit_time > 0 && result.data.mode !== 1) {
      result = await update('subscription', { limit_time: 0 }, where('email', '==', email));
      result.data.limit_days = 0;
    }

    // 免费 或 付费
    if (result.data.limit_days > 0 || result.data.mode === 1) {
      result.data.isPay = true;
    } else {
      result.data.isPay = false;
    }

    cookies().set('UFO-PAY', result.data.isPay);
  } catch (e) {
    console.log('e: ', e);
  }

  return new Response(JSON.stringify(result), { headers: res.headers });
};
