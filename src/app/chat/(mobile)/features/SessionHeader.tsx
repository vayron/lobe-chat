import { ActionIcon, Avatar, MobileNavBar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { MessageSquarePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { MOBILE_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { DEFAULT_USER_AVATAR_URL } from '@/const/meta';
import { useSessionStore } from '@/store/session';
import { mobileHeaderSticky } from '@/styles/mobileHeader';

import Vip from '../../components/Vip';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    top: 0;
  `,
}));

const Header = memo(() => {
  const [createSession] = useSessionStore((s) => [s.createSession]);
  const router = useRouter();

  return (
    <MobileNavBar
      left={
        <Flexbox align={'center'} gap={8} horizontal style={{ marginLeft: 8 }}>
          <div onClick={() => router.push('/settings')}>
            <Avatar avatar={DEFAULT_USER_AVATAR_URL} size={28} />
          </div>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bolder' }}>UFO·SB</div>
        </Flexbox>
      }
      right={
        <>
          <Vip isMobile={true} />
          <ActionIcon
            icon={MessageSquarePlus}
            onClick={() => createSession()}
            size={MOBILE_HEADER_ICON_SIZE}
          />
        </>
      }
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
