import { where } from 'firebase/firestore';
import moment from 'moment';

import { get, update } from '../controller';

// @ts-ignore
global['navigator'] = {};

export const runtime = 'edge';

export const GET = async (req: Request, res: Response) => {
  const email = new URL(req.url).searchParams.get('email');
  let result = {} as any;
  try {
    result = await get('subscription', where('email', '==', email));

    if (result?.data?.limit_time - Date.now() > 0) {
      const date1 = moment(result.data.limit_time);
      const date2 = moment(Date.now());
      const diffInDays = date1.diff(date2, 'days');
      result.data.limit_days = diffInDays + 1;
    } else if (result?.data?.limit_time !== 0) {
      result = await update('subscription', { limit_time: 0 }, where('email', '==', email));
    }
  } catch (e) {
    console.log('e: ', e);
  }

  return new Response(JSON.stringify(result), { headers: res.headers });
};
