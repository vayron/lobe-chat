import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import SubscriptionPlanList from '@/components/SubscriptionPlanList';
import { useFirebaseStore } from '@/store/firebase/store';

import { FormAction } from './style';

interface AccessCodeFormProps {
  id: string;
}

const AccessCodeForm = memo<AccessCodeFormProps>(() => {
  const { t } = useTranslation('tool');
  const { links, subscription } = useFirebaseStore.getState();

  return (
    <FormAction
      avatar={'👑'}
      description={t('subscriptionCard.description')}
      title={t('subscriptionCard.title')}
    >
      <SubscriptionPlanList links={links} subscription={subscription}></SubscriptionPlanList>
    </FormAction>
  );
});

export default AccessCodeForm;
