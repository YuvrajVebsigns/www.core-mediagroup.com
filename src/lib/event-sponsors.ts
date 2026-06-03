import type { WebsiteEvent } from '@/services/events.service';
import {
  fetchWebsiteSponsors,
  normalizeSponsorRecord,
  type WebsiteSponsor,
} from '@/services/sponsors.service';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getEventSponsorsField(event: WebsiteEvent): unknown[] {
  const record = event as Record<string, unknown>;
  const sponsors = record.sponsors;

  if (Array.isArray(sponsors)) return sponsors;

  const nested = record.data;
  if (isRecord(nested) && Array.isArray(nested.sponsors)) {
    return nested.sponsors;
  }

  return [];
}

export async function resolveEventSponsors(event: WebsiteEvent): Promise<WebsiteSponsor[]> {
  const sponsorsField = getEventSponsorsField(event);
  if (!sponsorsField.length) return [];

  const first = sponsorsField[0];

  if (isRecord(first)) {
    return sponsorsField
      .map((item) => normalizeSponsorRecord(item))
      .filter((item): item is WebsiteSponsor => item !== null)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }

  const sponsorIds = sponsorsField
    .map((item) =>
      typeof item === 'string' ? item : isRecord(item) ? String(item.id ?? item._id ?? '') : '',
    )
    .filter(Boolean);

  if (!sponsorIds.length) return [];

  const allSponsors = await fetchWebsiteSponsors({ limit: 200 });
  const idSet = new Set(sponsorIds);

  return allSponsors
    .filter((sponsor) => idSet.has(sponsor.id))
    .sort((a, b) => sponsorIds.indexOf(a.id) - sponsorIds.indexOf(b.id));
}
