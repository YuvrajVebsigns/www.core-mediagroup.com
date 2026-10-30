import 'server-only';

import { WEBSITE_DOMAIN } from '@/constants/app.constants';
import { apiFetch } from '@/services/apiFetch';
import {
  type WebsiteBlogDetailResponse,
  type WebsiteBlogDetailItem,
} from '@/services/blogs.service';

function getToken(response: {
  token?: string;
  data?: {
    token?: string;
    data?: {
      token?: string;
      website?: { token?: string };
      websiteId?: string;
      id?: string;
    };
    website?: { token?: string; id?: string };
    websiteId?: string;
    id?: string;
  };
  website?: { token?: string; id?: string };
  websiteId?: string;
}) {
  return (
    response.token ??
    response.data?.token ??
    response.data?.data?.token ??
    response.data?.website?.token ??
    response.data?.data?.website?.token
  );
}

function getWebsiteId(response: {
  data?: {
    data?: { website?: { id?: string }; websiteId?: string; id?: string };
    website?: { id?: string };
    websiteId?: string;
    id?: string;
  };
  website?: { id?: string };
  websiteId?: string;
  id?: string;
}) {
  return (
    response.websiteId ??
    response.website?.id ??
    response.data?.website?.id ??
    response.data?.data?.website?.id ??
    response.data?.websiteId ??
    response.data?.data?.websiteId ??
    response.data?.id ??
    response.id
  );
}

export async function fetchWebsiteBlogForMetadata(
  slug: string,
): Promise<WebsiteBlogDetailItem | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!apiBaseUrl || !slug) return null;

  const domain = WEBSITE_DOMAIN;
  const tokenResponse = await apiFetch<{
    token?: string;
    websiteId?: string;
    website?: { id?: string; token?: string };
    data?: {
      token?: string;
      websiteId?: string;
      id?: string;
      website?: { token?: string; id?: string };
      data?: {
        token?: string;
        websiteId?: string;
        id?: string;
        website?: { token?: string; id?: string };
      };
    };
  }>(`${apiBaseUrl}/api/v1/website/token?domain=${encodeURIComponent(domain)}`, {
    method: 'POST',
    cache: 'no-store',
    requireAuth: false,
    headers: { 'x-website-domain': domain },
    body: JSON.stringify({}),
  });

  const token = getToken(tokenResponse);
  const websiteId = getWebsiteId(tokenResponse);
  if (!token || !websiteId) return null;

  const response = await apiFetch<WebsiteBlogDetailResponse>(
    `${apiBaseUrl}/api/v1/website/blogs/${encodeURIComponent(slug)}`,
    {
      cache: 'no-store',
      requireAuth: false,
      headers: {
        Authorization: `Bearer ${token}`,
        'x-website-id': websiteId,
      },
    },
  );

  return response.success ? response.data : null;
}
