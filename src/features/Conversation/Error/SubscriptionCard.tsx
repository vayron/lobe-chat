import { Button } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import SubscriptionPlanList from '@/components/SubscriptionPlanList';
import { useChatStore } from '@/store/chat';
import { useFirebaseStore } from '@/store/firebase/store';

import { FormAction } from './style';

interface AccessCodeFormProps {
  id: string;
}

const AccessCodeForm = memo<AccessCodeFormProps>(({ id }) => {
  const { t } = useTranslation('error');
  const [deleteMessage] = useChatStore((s) => [s.internalResendMessage, s.deleteMessage]);
  const subscription = useFirebaseStore.getState().subscription;

  return (
    <>
      <FormAction
        avatar={'👑'}
        description={t('unlock.password.description')}
        title={t('unlock.password.title')}
      >
        <SubscriptionPlanList subscription={subscription}></SubscriptionPlanList>
      </FormAction>
      <Flexbox gap={12}>
        <Button
          onClick={() => {
            deleteMessage(id);
          }}
        >
          {t('unlock.closeMessage')}
        </Button>
      </Flexbox>
    </>
  );
});

export default AccessCodeForm;
