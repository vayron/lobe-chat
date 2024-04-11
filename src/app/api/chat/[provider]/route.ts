import { cookies } from 'next/headers';

import { getPreferredRegion } from '@/app/api/config';
import { createErrorResponse } from '@/app/api/errorResponse';
import { OAUTH_AUTHORIZED } from '@/const/auth';
import { ChatCompletionErrorPayload } from '@/libs/agent-runtime';
import { ChatErrorType } from '@/types/fetch';
import { ChatStreamPayload } from '@/types/openai/chat';
import { getTracePayload } from '@/utils/trace';

import AgentRuntime from '../agentRuntime';
import { checkAuth } from '../auth';

export const runtime = 'edge';

export const preferredRegion = getPreferredRegion();

export const POST = checkAuth(async (req: Request, { params, jwtPayload }) => {
  const { provider } = params;
  const cookieStore = cookies();
  try {
    // ============  1. init chat model   ============ //
    const agentRuntime = await AgentRuntime.initializeWithUserPayload(provider, jwtPayload);

    const oauthAuthorized = !!req.headers.get(OAUTH_AUTHORIZED);

    // check the access code
    if (!oauthAuthorized) {
      return createErrorResponse(ChatErrorType.InvalidAccessCode, {
        provider: 'oauth',
      });
      // check vip
    } else if (cookieStore.get('UFO-PAY')?.value === 'false') {
      return createErrorResponse(ChatErrorType.InvalidAccessCode, {
        provider: 'subscription',
      });
    }
    // ============  2. create chat completion   ============ //

    const data = (await req.json()) as ChatStreamPayload;

    // console.log('provider: ', provider, data);

    const tracePayload = getTracePayload(req);

    return await agentRuntime.chat(data, {
      enableTrace: tracePayload?.enabled,
      provider,
      trace: tracePayload,
    });
  } catch (e) {
    const {
      errorType = ChatErrorType.InternalServerError,
      error: errorContent,
      ...res
    } = e as ChatCompletionErrorPayload;

    const error = errorContent || e;
    // track the error at server side
    console.error(`Route: [${provider}] ${errorType}:`, error);

    return createErrorResponse(errorType, { error, ...res, provider });
  }
});
