import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

export type WebsiteSponsor = {
  id: string;
  name: string;
  companyName?: string;
  logoUrl?: string;
  website?: string;
  tier?: string;
  description?: string;
  sortOrder?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getLogoUrl(logo: unknown): string | undefined {
  if (typeof logo === 'string' && logo.trim()) return logo;

  if (!isRecord(logo)) return undefined;

  return (
    (typeof logo.original === 'string' && logo.original) ||
    (typeof logo.medium === 'string' && logo.medium) ||
    (typeof logo.small === 'string' && logo.small) ||
    (typeof logo.thumbnail === 'string' && logo.thumbnail) ||
    (typeof logo.large === 'string' && logo.large) ||
    undefined
  );
}

export function normalizeSponsorRecord(raw: unknown): WebsiteSponsor | null {
  if (!isRecord(raw)) return null;

  const id = String(raw.id ?? raw._id ?? '');
  if (!id) return null;

  const companyName = typeof raw.companyName === 'string' ? raw.companyName.trim() : undefined;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';

  return {
    id,
    name: companyName || name || 'Sponsor',
    companyName,
    logoUrl: getLogoUrl(raw.logo),
    website: typeof raw.website === 'string' ? raw.website : undefined,
    tier: typeof raw.tier === 'string' ? raw.tier : undefined,
    description: typeof raw.description === 'string' ? raw.description : undefined,
    sortOrder: typeof raw.sortOrder === 'number' ? raw.sortOrder : undefined,
  };
}

function extractSponsorItems(response: unknown): unknown[] {
  if (Array.isArray(response)) return response;

  if (typeof response !== 'object' || response === null) return [];

  const payload = response as Record<string, unknown>;
  const direct = payload.data;

  if (Array.isArray(direct)) return direct;

  if (typeof direct === 'object' && direct !== null) {
    const nested = direct as Record<string, unknown>;
    if (Array.isArray(nested.data)) return nested.data;
    if (Array.isArray(nested.items)) return nested.items;
    if (Array.isArray(nested.results)) return nested.results;
  }

  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;

  return [];
}

type FetchSponsorsOptions = {
  page?: number;
  limit?: number;
  tier?: string;
};

export async function fetchWebsiteSponsors(
  options: FetchSponsorsOptions = {},
): Promise<WebsiteSponsor[]> {
  const params = new URLSearchParams();
  if (options.page) params.set('page', String(options.page));
  if (options.limit) params.set('limit', String(options.limit));
  if (options.tier) params.set('tier', options.tier);

  const query = params.toString();
  const endpoint = query
    ? `${API_ENDPOINTS.WEBSITE.SPONSORS.BASE}?${query}`
    : API_ENDPOINTS.WEBSITE.SPONSORS.BASE;

  const request = async () => {
    const auth = await ensureWebsiteAuth();
    return apiFetch<unknown>(endpoint, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });
  };

  try {
    const response = await request();
    return extractSponsorItems(response)
      .map((item) => normalizeSponsorRecord(item))
      .filter((item): item is WebsiteSponsor => item !== null)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch (error: unknown) {
    if (getApiErrorStatus(error) === 401) {
      clearWebsiteAuth();
      const response = await request();
      return extractSponsorItems(response)
        .map((item) => normalizeSponsorRecord(item))
        .filter((item): item is WebsiteSponsor => item !== null)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }

    throw error;
  }
}
