import { Icon, Modal } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Shrub, Sparkles, Zap } from 'lucide-react';
import { SessionContextValue, useSession } from 'next-auth/react';
import { memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import SubscriptionPlanList from '@/components/SubscriptionPlanList';
import { useFirebaseStore } from '@/store/firebase/store';

const useStyles = createStyles(({ css }) => ({
  active: css`
    color: #9b9b9b !important;
    background: #2f2f2f !important;
  `,
  bg: css`
    cursor: pointer;

    gap: 5px;

    width: max-content;
    margin-right: 5px;
    padding: 2px 10px;

    background: rgba(255, 255, 255, 10%);
    border-radius: 8px;
  `,
  btn: css`
    display: block;

    margin-top: 15px;
    padding: 10px 20px;

    font-weight: bold;
    color: #fff;
    text-align: center;

    background: #2f2f2f;
    border-radius: 8px;
  `,
  subTitle: css`
    color: gray;
  `,
  summary: css`
    margin-top: 15px;
  `,
  title: css`
    font-size: 20px;
    font-weight: bold;
  `,
  ul: css`
    padding-inline-start: 15px;

    li::marker {
      content: '✓';
    }

    li {
      margin-top: 5px;
    }

    p {
      margin-left: 15px;
    }
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
        <p>
          <Icon color="rgba(16,163,127,1)" icon={Shrub} />{' '}
          {props?.isMobile
            ? `${props?.subscription?.limit_days || 0} days free`
            : `${props?.subscription?.limit_days || 0} days left of free trial`}
        </p>
      );
      break;
    }
    case 1: {
      template = (
        <p>
          <Icon color="yellow" icon={Zap} /> SVIP
        </p>
      );
      break;
    }
    case 2: {
      template = (
        <p>
          <Icon color="rgba(0,102,222,1)" icon={Sparkles} />{' '}
          {props?.isMobile
            ? `${props?.subscription?.limit_days || 0} days left`
            : `${props?.subscription?.limit_days || 0} left of VIP`}
        </p>
      );
      break;
    }
  }

  return template;
}

const Vip = memo<{ isMobile?: boolean }>(({ isMobile }) => {
  let email = '' as string;
  let authSession: SessionContextValue | null;

  const { styles } = useStyles();
  const { subscription, createSubscriptionAction } = useFirebaseStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    subscription?.email && (
      <Flexbox align={'center'} distribution={'space-between'} horizontal>
        <div className={styles.bg} onClick={showModal}>
          <Btn isMobile={isMobile} subscription={subscription}></Btn>
        </div>

        <Modal footer={false} onCancel={handleCancel} open={isModalOpen} title="Upgrade your plan">
          <SubscriptionPlanList
            isMobile={isMobile}
            subscription={subscription}
          ></SubscriptionPlanList>
        </Modal>
      </Flexbox>
    )
  );
});

export default Vip;
