'use client';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from '@/components/PageTitle';

import Anthropic from './Anthropic';
import Bedrock from './Bedrock';
import Google from './Google';
import Groq from './Groq';
import Mistral from './Mistral';
import Moonshot from './Moonshot';
import Ollama from './Ollama';
import OpenAI from './OpenAI';
import OpenRouter from './OpenRouter';
import Perplexity from './Perplexity';
import TogetherAI from './TogetherAI';
import ZeroOne from './ZeroOne';
import Zhipu from './Zhipu';

export default memo<{ showOllama: boolean }>(({ showOllama }) => {
  const { t } = useTranslation('setting');

  return (
    <>
      <PageTitle title={t('tab.llm')} />
      <OpenAI />
      {/*<AzureOpenAI />*/}
      {showOllama && <Ollama />}
      <Anthropic />
      <Google />
      <Groq />
      <Bedrock />
      <Perplexity />
      <Mistral />
      <OpenRouter />
      <Moonshot />
      <ZeroOne />
      <Zhipu />
      <TogetherAI />
    </>
  );
});
