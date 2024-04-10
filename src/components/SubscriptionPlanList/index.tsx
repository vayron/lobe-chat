import { Grid, GridProps, Icon, useControls, useCreateStore } from '@lobehub/ui';
import { Shrub, Sparkles, Zap } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

interface SubscriptionPlan {
  isMobile?: boolean;
  subscription: any;
}

const SubscriptionPlanList = memo<SubscriptionPlan>(({ isMobile, subscription }) => {
  const { styles } = useStyles();
  const store = useCreateStore();
  const { t } = useTranslation('tool');
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
      btn: t('subscriptionPlan.plan_0.btn'),
      btnBgColor: 'rgba(16,163,127,1)',
      icon: (
        <>
          <Icon color="rgba(16,163,127,1)" icon={Shrub} /> {t('subscriptionPlan.plan_0.title')}
        </>
      ),
      list: [
        t('subscriptionPlan.plan_0.list.p_0'),
        t('subscriptionPlan.plan_0.list.p_1'),
        t('subscriptionPlan.plan_0.list.p_2'),
        t('subscriptionPlan.plan_0.list.p_3'),
        t('subscriptionPlan.plan_0.list.p_4'),
      ],
      subTitle: `USD $0.00/${t('subscriptionPlan.date.month')}`,
      summary: t('subscriptionPlan.plan_0.summary'),
      title: t('subscriptionPlan.plan_0.title'),
    },
    {
      active: subscription?.mode === 1,
      btn: t('subscriptionPlan.plan_1.btn'),
      btnBgColor: '#d90000',
      href: '',
      icon: (
        <>
          <Icon color="yellow" icon={Zap} /> SVIP
        </>
      ),

      list: [t('subscriptionPlan.plan_1.list.p_0'), t('subscriptionPlan.plan_1.list.p_1')],
      subTitle: (
        <>
          USD <span style={{ textDecoration: 'line-through' }}>$1.99</span> $1.50/
          {t('subscriptionPlan.date.month')}
        </>
      ),
      summary: t('subscriptionPlan.plan_1.summary'),
      title: 'SVIP',
    },
    {
      active: subscription?.mode === 2,
      btn: t('subscriptionPlan.plan_2.btn'),
      btnBgColor: 'rgba(0,102,222,1)',
      icon: (
        <>
          <Icon color="rgba(0,102,222,1)" icon={Sparkles} /> VIP
        </>
      ),
      list: [t('subscriptionPlan.plan_2.list.p_0')],
      subTitle: `USD $1.99/30${t('subscriptionPlan.date.day')}`,
      summary: t('subscriptionPlan.plan_2.summary'),
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
              {item.active ? t('subscriptionPlan.currentPlan') : item.btn}
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
