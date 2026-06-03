'use client';

import Image from 'next/image';

type StaticSponsor = {
  id: string;
  name: string;
  logoUrl: string;
  tier?: string;
  description?: string;
  website?: string;
};

const STATIC_EVENT_SPONSORS: StaticSponsor[] = [
  {
    id: 'sponsor-1',
    name: 'Tech Corp',
    logoUrl: '/assets/keyclients/client1.png',
    tier: 'Platinum',
    description: 'Leading technology partner',
  },
  {
    id: 'sponsor-2',
    name: 'Global Solutions',
    logoUrl: '/assets/keyclients/client2.png',
    tier: 'Gold',
    description: 'Enterprise solutions provider',
  },
  {
    id: 'sponsor-3',
    name: 'Innovate Ltd',
    logoUrl: '/assets/keyclients/client3.png',
    tier: 'Gold',
    description: 'Digital innovation partner',
  },
  {
    id: 'sponsor-4',
    name: 'NextGen Systems',
    logoUrl: '/assets/keyclients/client4.png',
    tier: 'Silver',
    description: 'Cloud and infrastructure partner',
  },
  // {
  //   id: 'sponsor-5',
  //   name: 'Summit Group',
  //   logoUrl: '/assets/keyclients/client5.png',
  //   tier: 'Silver',
  //   description: 'Strategic business partner',
  // },
  // {
  //   id: 'sponsor-6',
  //   name: 'Prime Ventures',
  //   logoUrl: '/assets/keyclients/client6.png',
  //   tier: 'Partner',
  //   description: 'Supporting partner',
  // },
];

function getTierClass(tier?: string) {
  if (!tier) return 'event-sponsor-tier-default';
  return `event-sponsor-tier-${tier.toLowerCase()}`;
}

export default function EventSponsorsSection() {
  return (
    <section className="event-sponsors-section" aria-labelledby="event-sponsors-heading">
      <div className="event-details-sidebar-card event-sponsors-card">
        <h3 id="event-sponsors-heading">Event Sponsors</h3>
        <p>Our partners supporting this event.</p>

        <div className="event-sponsors-grid">
          {STATIC_EVENT_SPONSORS.map((sponsor) => (
            <article key={sponsor.id} className="event-sponsor-card">
              <div className="event-sponsor-logo-wrap">
                <Image
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  width={160}
                  height={56}
                  className="event-sponsor-logo"
                />
              </div>

              <div className="event-sponsor-meta">
                <strong className="event-sponsor-name">{sponsor.name}</strong>
                {sponsor.tier ? (
                  <span className={`event-sponsor-tier ${getTierClass(sponsor.tier)}`}>
                    {sponsor.tier}
                  </span>
                ) : null}
                {sponsor.description ? (
                  <p className="event-sponsor-description">{sponsor.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
