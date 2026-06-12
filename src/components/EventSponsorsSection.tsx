'use client';

import Image from 'next/image';

type Sponsor = {
  id: string;
  name: string;
  logoUrl?: string;
  logo?: string | Record<string, string>;
  tier?: string;
  description?: string;
  website?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  contactName?: string;
  personName?: string;
  designation?: string;
  [key: string]: unknown;
};

type StaticSponsor = {
  id: string;
  name: string;
  logoUrl: string;
  tier?: string;
  description?: string;
  website?: string;
  companyName?: string;
};

const STATIC_EVENT_SPONSORS: StaticSponsor[] = [
  {
    id: 'sponsor-1',
    name: 'Rajesh Mehta',
    companyName: 'Lenovo',
    logoUrl: '/assets/keyclients/client1.png',
    tier: 'Platinum',
    description: 'Leading technology partner',
  },
  {
    id: 'sponsor-2',
    name: 'Priya Singh',
    companyName: 'Pure Storage',
    logoUrl: '/assets/keyclients/client2.png',
    tier: 'Gold',
    description: 'Enterprise solutions provider',
  },
  {
    id: 'sponsor-3',
    name: 'Amit Kumar',
    companyName: 'Tata Communications',
    logoUrl: '/assets/keyclients/client3.png',
    tier: 'Gold',
    description: 'Digital innovation partner',
  },
  {
    id: 'sponsor-4',
    name: 'Neha Verma',
    companyName: 'Nutanix',
    logoUrl: '/assets/keyclients/client4.png',
    tier: 'Silver',
    description: 'Cloud and infrastructure partner',
  },
];

function getTierClass(tier?: string) {
  if (!tier) return 'event-sponsor-tier-default';
  return `event-sponsor-tier-${tier.toLowerCase()}`;
}

function getLogoUrl(sponsor: Sponsor): string | undefined {
  if (typeof sponsor.logoUrl === 'string' && sponsor.logoUrl.trim()) {
    return sponsor.logoUrl;
  }

  if (typeof sponsor.logo === 'string' && sponsor.logo.trim()) {
    return sponsor.logo;
  }

  if (typeof sponsor.logo === 'object' && sponsor.logo !== null) {
    const logo = sponsor.logo as Record<string, unknown>;
    return (
      (typeof logo.original === 'string' && logo.original) ||
      (typeof logo.medium === 'string' && logo.medium) ||
      (typeof logo.small === 'string' && logo.small) ||
      (typeof logo.thumbnail === 'string' && logo.thumbnail) ||
      (typeof logo.large === 'string' && logo.large) ||
      undefined
    );
  }

  return undefined;
}

interface EventSponsorsSectionProps {
  sponsors?: Sponsor[] | null;
}

export default function EventSponsorsSection({ sponsors }: EventSponsorsSectionProps) {
  const displaySponsors = sponsors && sponsors.length > 0 ? sponsors : STATIC_EVENT_SPONSORS;
  const hasRealSponsors = sponsors && sponsors.length > 0;
  const staticLenovoLogo = '/assets/keyclients/client1.png'; // Static Lenovo logo

  // If no real sponsors from API, don't render anything
  if (!hasRealSponsors) {
    return null;
  }

  return (
    <section className="event-sponsors-section" aria-labelledby="event-sponsors-heading">
      <div className="event-details-sidebar-card event-sponsors-card">
        <h3 id="event-sponsors-heading">Event Sponsors</h3>
        <p>Our partners supporting this event.</p>

        <div className="event-sponsors-grid">
          {displaySponsors.map((sponsor) => {
            const logoUrl = getLogoUrl(sponsor);
            const hasLogo = !!logoUrl;

            // Get contact person name (priority: contactName > personName > name)
            const contactName =
              sponsor.contactName || sponsor.personName || sponsor.name || 'Contact';

            // Get company name
            const companyName = sponsor.companyName || 'Company';

            return (
              <article key={sponsor.id} className="event-sponsor-card">
                <div className="event-sponsor-logo-wrap">
                  <Image
                    src={logoUrl || staticLenovoLogo}
                    alt={companyName}
                    width={160}
                    height={56}
                    className="event-sponsor-logo"
                  />
                </div>

                <div className="event-sponsor-meta">
                  <strong className="event-sponsor-name">{contactName}</strong>
                  <p style={{ fontSize: '0.9em', color: '#666', margin: '4px 0' }}>{companyName}</p>
                  {sponsor.tier ? (
                    <span className={`event-sponsor-tier ${getTierClass(sponsor.tier)}`}>
                      {sponsor.tier}
                    </span>
                  ) : null}
                  {hasLogo && sponsor.description ? (
                    <p className="event-sponsor-description">{sponsor.description}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
