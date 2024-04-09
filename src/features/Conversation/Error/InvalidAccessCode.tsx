import { Icon } from '@lobehub/ui';
import { Segmented } from 'antd';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import { AsteriskSquare, KeySquare, ScanFace } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';
import { commonSelectors } from '@/store/global/selectors';

import APIKeyForm from './APIKeyForm';
import OAuthForm from './OAuthForm';
import SubscriptionCard from './SubscriptionCard';
import { ErrorActionContainer } from './style';

enum Tab {
  Api = 'api',
  Oauth = 'oauth',
  Password = 'password',
  Subscription = 'subscription',
}

interface InvalidAccessCodeProps {
  id: string;
  provider?: string;
  tab: any;
}

const InvalidAccessCode = memo<InvalidAccessCodeProps>(({ id, provider, tab }) => {
  const { t } = useTranslation('error');
  const isEnabledOAuth = useGlobalStore(commonSelectors.enabledOAuthSSO);
  const defaultTab = tab || (isEnabledOAuth ? Tab.Oauth : Tab.Subscription);
  const [mode, setMode] = useState<Tab>(defaultTab);

  return (
    <ErrorActionContainer>
      <Segmented
        block
        onChange={(value) => setMode(value as Tab)}
        options={
          [
            isEnabledOAuth
              ? {
                  icon: <Icon icon={ScanFace} />,
                  label: t('oauth', { ns: 'common' }),
                  value: Tab.Oauth,
                }
              : undefined,
            {
              icon: <Icon icon={AsteriskSquare} />,
              label: t('unlock.tabs.password'),
              value: Tab.Subscription,
            },
            { icon: <Icon icon={KeySquare} />, label: t('unlock.tabs.apiKey'), value: Tab.Api },
          ].filter(Boolean) as SegmentedLabeledOption[]
        }
        style={{ width: '100%' }}
        value={mode}
      />
      <Flexbox gap={24}>
        {mode === Tab.Subscription && <SubscriptionCard id={id} />}
        {mode === Tab.Api && <APIKeyForm id={id} provider={provider} />}
        {isEnabledOAuth && mode === Tab.Oauth && <OAuthForm id={id} />}
      </Flexbox>
    </ErrorActionContainer>
  );
});

export default InvalidAccessCode;
