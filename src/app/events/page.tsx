'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';
import FallbackImage from '@/components/FallbackImage';

function getStoredWebsiteId(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  try {
    const raw = window.localStorage.getItem('websiteAuth');
    if (!raw) return undefined;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && 'websiteId' in parsed) {
      const websiteId = (parsed as { websiteId?: unknown }).websiteId;
      return typeof websiteId === 'string' ? websiteId : undefined;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function getEventImage(event: WebsiteEvent): string {
  if (event.bannerImage?.medium) return event.bannerImage.medium;
  if (event.bannerImage?.small) return event.bannerImage.small;
  if (event.bannerImage?.original) return event.bannerImage.original;

  if (event.bannerImageId?.urlVariants?.medium) return event.bannerImageId.urlVariants.medium;
  if (event.bannerImageId?.urlVariants?.small) return event.bannerImageId.urlVariants.small;
  if (event.bannerImageId?.url) return event.bannerImageId.url;

  if (event.featureImage?.medium) return event.featureImage.medium;
  if (event.featureImage?.small) return event.featureImage.small;
  if (event.featureImage?.original) return event.featureImage.original;

  return '/assets/blogs/blog-1.webp';
}

function getEventCategory(event: WebsiteEvent): string {
  return event.type || 'Events';
}

function getEventTitle(event: WebsiteEvent): string {
  return event.title || 'Event';
}

type EventFilter = 'all' | 'online' | 'offline';

function getEventFormat(event: WebsiteEvent): 'online' | 'offline' | null {
  const onlineValue = event.isOnline ?? event.online;
  if (typeof onlineValue === 'boolean') return onlineValue ? 'online' : 'offline';

  const formatValue = event.eventMode ?? event.mode ?? event.eventType ?? event.type;
  if (typeof formatValue !== 'string') return null;

  const normalizedValue = formatValue.trim().toLowerCase();
  if (normalizedValue.includes('online') || normalizedValue === 'virtual') return 'online';
  if (normalizedValue.includes('offline') || normalizedValue === 'in-person') return 'offline';

  return null;
}

export default function EventsPage() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);
  const [eventFilter, setEventFilter] = useState<EventFilter>('all');

  useEffect(() => {
    fetchWebsiteEvents(getStoredWebsiteId())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]));
  }, []);

  const heroMediaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const leftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const rightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  const filteredEvents =
    events?.filter((event) => eventFilter === 'all' || getEventFormat(event) === eventFilter) ??
    null;

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Events"
            fill
            priority
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay"></div>

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Event Calendar</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              <Image
                src="/assets/home/home.png" // Replace with your image path
                alt="Home"
                width={38}
                height={48}
                className="blog-home-icon"
              />
              <span>Home</span>
            </Link>

            <span>&gt;</span>

            <p>Event</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="project-container">
          <div className="events-filter" aria-label="Filter events by format" role="group">
            {(['all', 'online', 'offline'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                className={`events-filter-button${eventFilter === filter ? ' active' : ''}`}
                aria-pressed={eventFilter === filter}
                onClick={() => setEventFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter === 'online' ? 'Online' : 'Offline'}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {events === null ? (
              <div className="events-loading">Loading events…</div>
            ) : filteredEvents?.length === 0 ? (
              <div className="events-empty">No events available at the moment.</div>
            ) : (
              filteredEvents?.map((item, index) => {
                const title = getEventTitle(item);
                const slug =
                  item.slug ||
                  item.id ||
                  title
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '');

                const imageSrc = getEventImage(item);
                const category = getEventCategory(item);

                return (
                  <Link key={item.id || slug} href={`/events/${slug}`}>
                    <div className="project-card" ref={index % 2 === 0 ? leftRef : rightRef}>
                      <div className="project-image-wrap">
                        <FallbackImage
                          src={imageSrc}
                          alt={title}
                          fill
                          className="project-image"
                          unoptimized={imageSrc.startsWith('http')}
                        />
                      </div>

                      <div className="project-overlay">
                        <span className="project-category">{category}</span>

                        <div className="project-content">
                          <h3>{title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
