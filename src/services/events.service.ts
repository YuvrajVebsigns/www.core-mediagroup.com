import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  ensureWebsiteAuth as obtainWebsiteAuth,
  getWebsiteDomain,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

type WebsiteAuth = {
  token: string;
  websiteId: string;
};

export type WebsiteEvent = {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  type?: 'OFFLINE' | 'ONLINE' | string;
  startDate?: string;
  endDate?: string;
  startsAt?: string;
  bannerImageId?: {
    id: string;
    metadata?: {
      width?: number;
      height?: number;
      blurhash?: string;
      alt?: string;
    };
    url?: string;
    urlVariants?: {
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
    };
  };
  bannerImage?: {
    original?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  totalRegistrations?: number;
  featureImage?:
    | string
    | {
        small?: string;
        medium?: string;
        large?: string;
        original?: string;
        thumbnail?: string;
      };
  [key: string]: unknown;
};

type RawEvent = Record<string, unknown>;

export function getEventImage(event?: WebsiteEvent | null): string {
  if (!event) return '/assets/blogs/blog-1.webp';

  // 1. Try bannerImage fields (which are url variants returned in updated API response)
  const bannerImage = event.bannerImage;
  if (bannerImage && typeof bannerImage === 'object') {
    const url =
      bannerImage.medium ||
      bannerImage.large ||
      bannerImage.original ||
      bannerImage.small ||
      bannerImage.thumbnail;
    if (url && url.trim()) return url;
  }

  // 2. Try bannerImageId url/urlVariants
  const bannerImageId = event.bannerImageId;
  if (bannerImageId && typeof bannerImageId === 'object') {
    if (bannerImageId.urlVariants && typeof bannerImageId.urlVariants === 'object') {
      const url =
        bannerImageId.urlVariants.medium ||
        bannerImageId.urlVariants.large ||
        bannerImageId.urlVariants.thumbnail ||
        bannerImageId.urlVariants.small;
      if (url && url.trim()) return url;
    }
    if (typeof bannerImageId.url === 'string' && bannerImageId.url.trim()) {
      return bannerImageId.url;
    }
  }

  // 3. Try featureImage
  const featureImage = event.featureImage;
  if (typeof featureImage === 'string' && featureImage.trim()) return featureImage;
  if (featureImage && typeof featureImage === 'object') {
    const url =
      featureImage.small ||
      featureImage.medium ||
      featureImage.large ||
      featureImage.original ||
      featureImage.thumbnail;
    if (url && url.trim()) return url;
  }

  // 4. Try other direct string image fields
  const eventObj = event as Record<string, unknown>;
  for (const field of ['image', 'heroImage', 'banner', 'poster'] as const) {
    const val = eventObj[field];
    if (typeof val === 'string' && val.trim()) return val;
  }

  return '/assets/blogs/blog-1.webp';
}

export function getEventCategory(event?: WebsiteEvent | null): string {
  if (!event) return 'Events';

  const category =
    typeof event.category === 'string'
      ? event.category
      : typeof event.type === 'string'
        ? event.type
        : null;

  return category && category.trim() ? category : 'Events';
}

export function getEventTitle(event?: WebsiteEvent | null): string {
  if (!event) return 'Event';

  const title =
    typeof event.title === 'string'
      ? event.title
      : typeof event.name === 'string'
        ? event.name
        : typeof event.eventName === 'string'
          ? event.eventName
          : null;

  return title && title.trim() ? title : 'Event';
}

function mapRawToWebsiteEvent(it: RawEvent, fallbackId?: string): WebsiteEvent {
  const bannerImage = it.bannerImage as Record<string, string> | undefined;
  const bannerImageId = it.bannerImageId as Record<string, unknown> | undefined;

  const startsAt = (it.startDate as string) ?? (it.startsAt as string) ?? undefined;
  const title =
    (it.title as string) ?? (it.name as string) ?? (it.eventName as string) ?? undefined;
  const description =
    (it.excerpt as string) ?? (it.description as string) ?? (it.summary as string) ?? undefined;

  // Map bannerImage or bannerImageId.urlVariants to featureImage for backward compatibility
  const featureImage = it.featureImage ?? bannerImage ?? bannerImageId?.urlVariants;

  return {
    ...it,
    id: String(it.id ?? it._id ?? it.eventId ?? it.uid ?? fallbackId ?? ''),
    title,
    slug: (it.slug as string) ?? undefined,
    excerpt: (it.excerpt as string) ?? undefined,
    description,
    type: (it.type as string) ?? undefined,
    startDate: (it.startDate as string) ?? undefined,
    endDate: (it.endDate as string) ?? undefined,
    startsAt,
    bannerImageId: bannerImageId as WebsiteEvent['bannerImageId'],
    bannerImage: bannerImage as WebsiteEvent['bannerImage'],
    totalRegistrations:
      typeof it.totalRegistrations === 'number' ? it.totalRegistrations : undefined,
    featureImage: featureImage as WebsiteEvent['featureImage'],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getRecordValue(source: unknown, key: string): unknown {
  return isRecord(source) ? source[key] : undefined;
}

function getStringValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function readStoredWebsiteAuth(): WebsiteAuth | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem('websiteAuth');
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'token' in parsed &&
      'websiteId' in parsed &&
      typeof (parsed as { token?: unknown }).token === 'string' &&
      typeof (parsed as { websiteId?: unknown }).websiteId === 'string'
    ) {
      return {
        token: (parsed as { token: string }).token,
        websiteId: (parsed as { websiteId: string }).websiteId,
      };
    }
  } catch {
    return null;
  }

  return null;
}

async function ensureWebsiteAuth(domain: string) {
  if (typeof window === 'undefined') return null;

  const stored = readStoredWebsiteAuth();
  if (stored) return stored;

  const tokenRes = await apiFetch<unknown>(
    `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,
      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },
      body: JSON.stringify({ domain }),
    },
  );

  const token =
    getStringValue(getRecordValue(tokenRes, 'token')) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'token')) ??
    getStringValue(
      getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'data'), 'token'),
    ) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'token')) ??
    null;

  const websiteId =
    getStringValue(getRecordValue(tokenRes, 'websiteId')) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'id')) ??
    getStringValue(
      getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'website'), 'id'),
    ) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'websiteId')) ??
    getStringValue(getRecordValue(tokenRes, 'id')) ??
    null;

  if (token && websiteId) {
    const value: WebsiteAuth = { token, websiteId };
    window.localStorage.setItem('websiteAuth', JSON.stringify(value));
    return value;
  }

  return null;
}

function getApiErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    const statusCode = (error as { statusCode?: unknown }).statusCode;
    return typeof statusCode === 'number' ? statusCode : Number(statusCode);
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status?: unknown }).status;
    return typeof status === 'number' ? status : Number(status);
  }

  return undefined;
}

function extractEventItems(res: unknown): RawEvent[] {
  if (Array.isArray(res)) return res as RawEvent[];
  if (!isRecord(res)) return [];

  if (isRecord(res.data) && Array.isArray(res.data.data)) {
    return res.data.data as RawEvent[];
  }
  if (Array.isArray(res.data)) {
    return res.data as RawEvent[];
  }
  if (Array.isArray(res.items)) {
    return res.items as RawEvent[];
  }
  if (Array.isArray(res.results)) {
    return res.results as RawEvent[];
  }

  return [];
}

export async function fetchWebsiteEvents(websiteId?: string): Promise<WebsiteEvent[]> {
  const domain = getWebsiteDomain();
  let auth: WebsiteAuth | null = null;

  if (!websiteId) {
    auth = await ensureWebsiteAuth(domain);
    websiteId = auth?.websiteId ?? undefined;
  } else {
    auth = readStoredWebsiteAuth();
  }

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (websiteId) headers['x-website-id'] = websiteId;

  try {
    const url = websiteId
      ? `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}`
      : API_ENDPOINTS.WEBSITE.EVENTS.BASE;

    const res = await apiFetch<unknown>(url, {
      method: 'GET',
      requireAuth: false,
      headers,
    });

    const items = extractEventItems(res);
    return items.map((it) => mapRawToWebsiteEvent(it));
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);

      if (freshAuth?.token) {
        const retryHeaders: Record<string, string> = {
          Authorization: `Bearer ${freshAuth.token}`,
          'x-website-id': freshAuth.websiteId,
        };

        const res = await apiFetch<unknown>(
          `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?websiteId=${encodeURIComponent(
            freshAuth.websiteId,
          )}`,
          {
            method: 'GET',
            requireAuth: false,
            headers: retryHeaders,
          },
        );

        const items = extractEventItems(res);
        return items.map((it) => mapRawToWebsiteEvent(it));
      }
    }

    throw error;
  }
}

export async function fetchWebsiteEventByIdOrSlug(idOrSlug: string): Promise<WebsiteEvent | null> {
  const domain = getWebsiteDomain();
  let auth: WebsiteAuth | null = readStoredWebsiteAuth();

  if (!auth?.token) {
    try {
      auth = await obtainWebsiteAuth(domain);
    } catch {
      auth = null;
    }
  }

  const headers: Record<string, string> = auth ? buildWebsiteAuthHeaders(auth) : {};

  try {
    const url = API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(idOrSlug));

    const res = await apiFetch<unknown>(url, {
      method: 'GET',
      requireAuth: false,
      headers,
    });

    const data = isRecord(res) ? (res.data ?? res) : null;
    if (!data) return null;

    return mapRawToWebsiteEvent(data as RawEvent, idOrSlug);
  } catch (error: unknown) {
    const status = getRecordValue(error, 'status');

    if ((status === 401 || status === '401') && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);

      if (freshAuth?.token) {
        const retryHeaders: Record<string, string> = {
          Authorization: `Bearer ${freshAuth.token}`,
          'x-website-id': freshAuth.websiteId,
        };

        const url = API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(idOrSlug));

        const res = await apiFetch<unknown>(url, {
          method: 'GET',
          requireAuth: false,
          headers: retryHeaders,
        });

        const data = isRecord(res) ? (res.data ?? res) : null;
        if (!data) return null;

        return mapRawToWebsiteEvent(data as RawEvent, idOrSlug);
      }
    }

    throw error;
  }
}
