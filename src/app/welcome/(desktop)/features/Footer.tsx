'use client';

import { useTheme } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { AGENTS_INDEX_GITHUB } from '@/const/url';

const Footer = memo(() => {
  const theme = useTheme();

  return (
    <Flexbox align={'center'} horizontal justify={'space-between'} style={{ padding: 16 }}>
      <span style={{ color: theme.colorTextDescription }}>
        ©{new Date().getFullYear()} UFO Super Bot
      </span>
      <Flexbox horizontal>
        <a href={AGENTS_INDEX_GITHUB}>Tribute to the Lobehub</a>
      </Flexbox>
    </Flexbox>
  );
});

export default Footer;
