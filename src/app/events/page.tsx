'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

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
  const eventObj = event as Record<string, unknown>;

  // Try to find image in various field names
  const image =
    typeof eventObj.image === 'string'
      ? eventObj.image
      : typeof eventObj.heroImage === 'string'
        ? eventObj.heroImage
        : typeof eventObj.banner === 'string'
          ? eventObj.banner
          : typeof eventObj.poster === 'string'
            ? eventObj.poster
            : typeof eventObj.featureImage === 'string'
              ? eventObj.featureImage
              : null;

  console.log('🖼️ getEventImage:', {
    title: eventObj.title,
    foundImage: image,
    checkedFields: {
      image: eventObj.image,
      heroImage: eventObj.heroImage,
      banner: eventObj.banner,
      poster: eventObj.poster,
      featureImage: eventObj.featureImage,
    },
  });

  if (image && image.trim()) return image;
  return '/assets/blogs/blog-1.webp';
}

function getEventCategory(event: WebsiteEvent): string {
  const eventObj = event as Record<string, unknown>;

  const category =
    typeof eventObj.category === 'string'
      ? eventObj.category
      : typeof eventObj.type === 'string'
        ? eventObj.type
        : null;

  return category && category.trim() ? category : 'Events';
}

function getEventTitle(event: WebsiteEvent): string {
  const eventObj = event as Record<string, unknown>;

  const title =
    typeof eventObj.title === 'string'
      ? eventObj.title
      : typeof eventObj.name === 'string'
        ? eventObj.name
        : typeof eventObj.eventName === 'string'
          ? eventObj.eventName
          : null;

  return title && title.trim() ? title : 'Event';
}

// type EventItem = {
//   category: string;
//   title: string;
//   image: string;
// };

export default function EventsPage() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

  useEffect(() => {
    fetchWebsiteEvents(getStoredWebsiteId())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          console.log('Events fetched:', data);
          setEvents(data);
        } else setEvents([]);
      })
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
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Events</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="project-container">
          {/* <div className="project-heading">
            <h2 className="project-title">
              Our Work <span>Highlights.</span>
            </h2>
          </div> */}

          {/* <div className="project-top-bar">
            <h6 className="project-subtitle">⬢ Custom Event Platforms</h6>

            <Link href="/events" className="talk-btn">
              <span>More Events</span>

              <div className="talk-btn-icon">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div> */}

          <div className="project-grid">
            {events === null ? (
              <div className="events-loading">Loading events…</div>
            ) : events.length === 0 ? (
              <div className="events-empty">No events available at the moment.</div>
            ) : (
              events.map((item: WebsiteEvent, index: number) => {
                const title = getEventTitle(item);
                const slug =
                  item.id && typeof item.id === 'string'
                    ? String(item.id)
                    : title
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '');

                const imageSrc = getEventImage(item);
                const category = getEventCategory(item);

                console.log(`Event: ${title}`, { imageSrc, category, eventObj: item });

                return (
                  <Link key={slug} href={`/events/${slug}`}>
                    <div className="project-card" ref={index === 0 ? leftRef : rightRef}>
                      <div className="project-image-wrap">
                        <Image src={imageSrc} alt={title} fill className="project-image" />
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

      {/* Duplicate the two events below (downside) with animations */}
      {/* <section className="project-section">
        <div className="project-container">
          <div className="project-top-bar">
            <h6 className="project-subtitle">⬢ More Events</h6>
          </div>

          <div className="project-grid">
            {Array.from({ length: 2 }, () => customEvents)
              .flat()
              .map((item, index) => {
                const variant = index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right';

                return <AnimatedEventCard key={`${item.title}-dup-${index}`} item={item} index={index} variant={variant} />;
              })}
          </div>
        </div>
      </section> */}
    </>
  );
}
