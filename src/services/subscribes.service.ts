import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

export type SubscribeApiBody = {
  email: string;
  source: string;
};

export type SubscribeInput = {
  email: string;
};

type SubscribeResponse = {
  success?: boolean;
  message?: string;
  data?: {
    email?: string;
    websiteId?: string;
    subscribedAt?: string;
    source?: string;
    isVerified?: boolean;
    id?: string;
  };
};

function buildSubscribeBody(input: SubscribeInput): SubscribeApiBody {
  return {
    email: input.email,
    source: 'footer',
  };
}

function assertSubscribeSaved(response: SubscribeResponse) {
  if (response.success === false) {
    throw new Error(response.message || 'Subscription was not saved.');
  }
}

async function postSubscribe(body: SubscribeApiBody) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<SubscribeResponse>(API_ENDPOINTS.WEBSITE.SUBSCRIBES, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(body),
  });
}

export async function submitSubscribe(input: SubscribeInput) {
  const body = buildSubscribeBody(input);

  try {
    const response = await postSubscribe(body);
    assertSubscribeSaved(response);
    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();
      const response = await postSubscribe(body);
      assertSubscribeSaved(response);
      return response;
    }

    throw error;
  }
}
