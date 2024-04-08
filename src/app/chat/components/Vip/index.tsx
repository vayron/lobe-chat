import { Icon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Zap } from 'lucide-react';
import { SessionContextValue, useSession } from 'next-auth/react';
import { memo, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStore } from '@/store/firebase/store';

const useStyles = createStyles(({ css }) => ({
  bg: css`
    display: flex;
    gap: 5px;

    padding: 2px 12px;

    background: rgba(255, 255, 255, 10%);
    border-radius: 8px;
  `,
}));

function Btn(props: any) {
  /**
   * mode: 0: free, 1: subscription, 2: payment
   * limit_time: -1: no limit, = 0: stop, > 0: limit time
   * **/
  let template;

  switch (props?.subscription?.mode) {
    case 0: {
      template = (
        <>
          <Icon color="#55a7ef" icon={Zap} />
          {props?.subscription?.limit_days} days left of free trial
        </>
      );
      break;
    }
    case 1: {
      template = (
        <>
          <Icon color="yellow" icon={Zap} />
          SVIP
        </>
      );
      break;
    }
    case 2: {
      template = (
        <>
          <Icon color="yellow" icon={Zap} />
          {props?.subscription?.limit_days} days left of VIP
        </>
      );
      break;
    }
  }

  return template;
}

const Vip = memo<{ email?: string }>(() => {
  let email = '' as string;
  let authSession: SessionContextValue | null;

  const { styles } = useStyles();
  const { subscription, createSubscriptionAction } = useStore();
  try {
    // refs: https://github.com/lobehub/lobe-chat/pull/1286
    // eslint-disable-next-line react-hooks/rules-of-hooks
    authSession = useSession();
    email = authSession?.data?.user?.email || '';
  } catch {
    authSession = null;
  }

  useEffect(() => {
    createSubscriptionAction(email);
  }, [email]);

  return (
    <Flexbox align={'center'} distribution={'space-between'} horizontal>
      <div className={styles.bg}>
        <Btn subscription={subscription}></Btn>
      </div>
    </Flexbox>
  );
});

export default Vip;
