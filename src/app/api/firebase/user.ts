import { where } from 'firebase/firestore';

import { add, get } from './controller';

// @ts-ignore
global['navigator'] = {};

interface UserInfo {
  avater: string | null | undefined;
  email: string | null | undefined;
  locale: string | null | undefined;
  username: string | null | undefined;
  uuid: string | null | undefined;
}

export const regiserUser = async (user: UserInfo) => {
  const result = await get('user', where('email', '==', user.email));
  if (!result?.data?.email && result.status) {
    add('user', {
      ...user,
    });
  }
};
