'use client';

import { PropsWithChildren, memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import ClientResponsiveLayout from '@/components/client/ClientResponsiveLayout';

import { useStyles } from '../features/Banner/style';

const Desktop = memo<PropsWithChildren>(({ children }) => {
  const { styles } = useStyles();
  return (
    <Center
      className={styles.layout}
      flex={1}
      height={'100%'}
      horizontal
      style={{ position: 'relative' }}
    >
      <div
        className={styles.logo}
        style={{ color: 'white', fontSize: '24px', fontWeight: 'bolder' }}
      >
        UFO·SB
      </div>
      <Flexbox className={styles.view} flex={1}>
        {children}
      </Flexbox>
    </Center>
  );
});

export default ClientResponsiveLayout({ Desktop, Mobile: () => import('./Mobile') });
