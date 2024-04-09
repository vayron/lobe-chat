import { Grid, GridProps, Icon, useControls, useCreateStore } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Shrub, Sparkles, Zap } from 'lucide-react';
import { memo, useState } from 'react';

const useStyles = createStyles(({ css }) => ({
  active: css`
    color: #9b9b9b !important;
    background: #2f2f2f !important;
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

interface SubscriptionPlan {
  isMobile?: boolean;
  subscription: any;
}

const SubscriptionPlanList = memo<SubscriptionPlan>(({ isMobile, subscription }) => {
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
        value: isMobile ? 1 : 3,
      },
    },
    { store },
  );

  const [configs] = useState([
    {
      active: subscription?.mode === 0,
      btn: 'Default plan',
      btnBgColor: 'rgba(16,163,127,1)',
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
      active: subscription?.mode === 1,
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
      active: subscription?.mode === 2,
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
        borderTop: isMobile ? '' : '1px solid hsla(0, 0%, 100%, .1)',
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
});

export default SubscriptionPlanList;
