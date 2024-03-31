'use client';

import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';

import { mobileHeaderSticky } from '@/styles/mobileHeader';

const Header = memo(() => {
  return (
    <MobileNavBar
      center={<div style={{ color: 'white', fontSize: '22px', fontWeight: 'bolder' }}>UFO·SB</div>}
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
