import { MobileNavBar } from '@lobehub/ui';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

import SettingButton from '../../../features/SettingButton';
import ChatHeaderTitle from './ChatHeaderTitle';

const MobileHeader = memo(() => {
  const router = useRouter();
  return (
    <MobileNavBar
      center={<ChatHeaderTitle />}
      onBackClick={() => router.push('/chat')}
      right={
        <>
          <div />
          <SettingButton mobile />
          {/*<Dropdown*/}
          {/*  menu={{*/}
          {/*    items,*/}
          {/*  }}*/}
          {/*  trigger={['click']}*/}
          {/*>*/}
          {/*  <ActionIcon icon={MoreHorizontal} />*/}
          {/*</Dropdown>*/}
        </>
      }
      showBackButton
    />
  );
});

export default MobileHeader;
