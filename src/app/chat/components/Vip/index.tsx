import { Icon, Modal } from '@lobehub/ui';
import { Shrub, Sparkles, Zap } from 'lucide-react';
import { SessionContextValue, useSession } from 'next-auth/react';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import SubscriptionPlanList from '@/components/SubscriptionPlanList';
import { useFirebaseStore } from '@/store/firebase/store';

import { useStyles } from './style';

function Btn(props: any) {
  const { t } = useTranslation('tool');
  /**
   * mode: 0: free, 1: subscription, 2: payment
   * limit_time: -1: no limit, = 0: stop, > 0: limit time
   * **/
  let template;

  switch (props?.subscription?.mode) {
    case 0: {
      template = (
        <p style={{ marginBottom: 0 }}>
          <Icon color="rgba(16,163,127,1)" icon={Shrub} />{' '}
          {props?.isMobile
            ? t('vip.common', {
                days: props?.subscription?.limit_days || 0,
              })
            : t('vip.free', {
                days: props?.subscription?.limit_days || 0,
              })}
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
            ? t('vip.common', {
                days: props?.subscription?.limit_days || 0,
              })
            : t('vip.payment', {
                days: props?.subscription?.limit_days || 0,
              })}
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
  const { t } = useTranslation('tool');
  const { createSubscriptionAction, links, subscription } = useFirebaseStore();
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

        <Modal
          footer={false}
          onCancel={handleCancel}
          open={isModalOpen}
          title={t('subscriptionCard.title')}
        >
          <SubscriptionPlanList
            isMobile={isMobile}
            links={links}
            subscription={subscription}
          ></SubscriptionPlanList>
        </Modal>
      </Flexbox>
    )
  );
});

export default Vip;
