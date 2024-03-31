import { ChatHeader } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import Link from 'next/link';
import { memo } from 'react';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    color: ${token.colorText};
    fill: ${token.colorText};
  `,
}));

const Header = memo(() => {
  const { styles } = useStyles();

  return (
    <ChatHeader
      left={
        <Link aria-label={'home'} href={'/'}>
          <div
            className={styles.logo}
            style={{ color: 'white', fontSize: '24px', fontWeight: 'bolder' }}
          >
            UFO·SB / Discover
          </div>
        </Link>
      }
    />
  );
});

export default Header;
