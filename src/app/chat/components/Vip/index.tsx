import { Grid, GridProps, Icon, Modal, useControls, useCreateStore } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Shrub, Sparkles, Zap } from 'lucide-react';
import { SessionContextValue, useSession } from 'next-auth/react';
import { memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStore as useFirebaseStore } from '@/store/firebase/store';

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
          <Icon color="rgba(16,163,127,1)" icon={Shrub} />
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
          <Icon color="yellow" icon={Zap} />
          SVIP
        </p>
      );
      break;
    }
    case 2: {
      template = (
        <p>
          <Icon color="rgba(0,102,222,1)" icon={Sparkles} />
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

function PlanList(props: any) {
  const { styles } = useStyles();
  const store = useCreateStore();
  const control: GridProps | any = useControls(
    {
      gap: {
        step: 1,
        value: 30,
      },
      maxItemWidth: {
        step: 1,
        value: 100,
      },
      rows: {
        step: 1,
        value: props?.isMobile ? 1 : 3,
      },
    },
    { store },
  );

  const [configs] = useState([
    {
      active: props?.subscription?.mode === 0,
      btn: 'Default plan',
      icon: (
        <>
          <Icon color="rgba(16,163,127,1)" icon={Shrub} /> Free
        </>
      ),
      list: [
        'Unlimited messages, interactions, and history',
        'Free to use and create agents',
        'Free to use ChatGPT Plugins',
        'Access on PC, mobile',
        'Support for PWA',
      ],
      subTitle: 'USD $0.00/month',
      summary: '7 days of free trial:',
      title: 'Free',
    },
    {
      active: props?.subscription?.mode === 1,
      btn: 'Subscribe to SVIP',
      btnBgColor: '#d90000',
      href: '',
      icon: (
        <>
          <Icon color="yellow" icon={Zap} /> SVIP
        </>
      ),

      list: ['Subscribe for 25% off every month', 'Unsubscribe at any time'],
      subTitle: (
        <>
          USD <span style={{ textDecoration: 'line-through' }}>$1.99</span> $1.50/month
        </>
      ),
      summary: 'Everything in Free, and:',
      title: 'SVIP',
    },
    {
      active: props?.subscription?.mode === 2,
      btn: 'Upgrade to VIP',
      btnBgColor: 'rgba(0,102,222,1)',
      icon: (
        <>
          <Icon color="rgba(0,102,222,1)" icon={Sparkles} /> VIP
        </>
      ),
      list: ['A single recharge delay of 30 days'],
      subTitle: 'USD $1.99/30days',
      summary: 'Everything in Free, and:',
      title: 'VIP',
    },
  ]);

  return (
    <Grid
      width={'100%'}
      {...control}
      style={{
        borderTop: props?.isMobile ? '' : '1px solid hsla(0, 0%, 100%, .1)',
        marginTop: '5px',
        padding: '20px 0',
      }}
    >
      {configs.map((item: any) => {
        return (
          <div key={item.title}>
            <p className={styles.title}>{item.icon}</p>
            <p className={styles.subTitle}>{item.subTitle}</p>
            <a
              className={`${styles.btn} ${item.active ? styles.active : undefined}`}
              style={{ background: item.btnBgColor }}
            >
              {item.active ? 'Your current plan' : item.btn}
            </a>
            <p className={styles.summary}>{item.summary}</p>
            <ul className={styles.ul}>
              {item.list?.map((li: any) => {
                return (
                  <li key={li}>
                    <p>{li}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </Grid>
  );
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
          <PlanList isMobile={isMobile} subscription={subscription}></PlanList>
        </Modal>
      </Flexbox>
    )
  );
});

export default Vip;
