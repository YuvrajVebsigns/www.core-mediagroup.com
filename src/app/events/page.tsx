// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import { useEffect, useState } from 'react';
// import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

// function getStoredWebsiteId(): string | undefined {
//   if (typeof window === 'undefined') return undefined;

//   try {
//     const raw = window.localStorage.getItem('websiteAuth');
//     if (!raw) return undefined;

//     const parsed: unknown = JSON.parse(raw);
//     if (typeof parsed === 'object' && parsed !== null && 'websiteId' in parsed) {
//       const websiteId = (parsed as { websiteId?: unknown }).websiteId;
//       return typeof websiteId === 'string' ? websiteId : undefined;
//     }
//   } catch {
//     return undefined;
//   }

//   return undefined;
// }

// function getEventImage(event: WebsiteEvent): string {
//   const eventObj = event as Record<string, unknown>;

//   // Check direct string image fields
//   for (const field of ['image', 'heroImage', 'banner', 'poster'] as const) {
//     const val = eventObj[field];
//     if (typeof val === 'string' && val.trim()) return val;
//   }

//   // Handle featureImage which may be a string or an Image object with size variants
//   const featureImage = eventObj.featureImage;
//   if (typeof featureImage === 'string' && featureImage.trim()) return featureImage;
//   if (
//     typeof featureImage === 'object' &&
//     featureImage !== null &&
//     'small' in featureImage &&
//     typeof (featureImage as Record<string, unknown>).small === 'string'
//   ) {
//     return (featureImage as Record<string, unknown>).small as string;
//   }

//   return '/assets/blogs/blog-1.webp';
// }

// function getEventCategory(event: WebsiteEvent): string {
//   const eventObj = event as Record<string, unknown>;

//   const category =
//     typeof eventObj.category === 'string'
//       ? eventObj.category
//       : typeof eventObj.type === 'string'
//         ? eventObj.type
//         : null;

//   return category && category.trim() ? category : 'Events';
// }

// function getEventTitle(event: WebsiteEvent): string {
//   const eventObj = event as Record<string, unknown>;

//   const title =
//     typeof eventObj.title === 'string'
//       ? eventObj.title
//       : typeof eventObj.name === 'string'
//         ? eventObj.name
//         : typeof eventObj.eventName === 'string'
//           ? eventObj.eventName
//           : null;

//   return title && title.trim() ? title : 'Event';
// }

// export default function EventsPage() {
//   const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

//   useEffect(() => {
//     fetchWebsiteEvents(getStoredWebsiteId())
//       .then((data) => {
//         if (Array.isArray(data) && data.length) {
//           setEvents(data);
//         } else {
//           setEvents([]);
//         }
//       })
//       .catch(() => setEvents([]));
//   }, []);

//   const heroMediaRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const heroContentRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const leftRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const rightRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   return (
//     <>
//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <Image
//             src="/assets/blogs/blog-1.webp"
//             alt="Events"
//             fill
//             priority
//             className="blog-hero-image"
//           />
//         </div>

//         <div className="blog-hero-overlay"></div>

//         <div className="blog-hero-content" ref={heroContentRef}>
//           <h1>Event Calendar</h1>

//           <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               🏦 Home
//             </Link>

//             <span>&gt;</span>

//             <p>Events</p>
//           </div>
//         </div>
//       </section>

//       <section className="project-section">
//         <div className="project-container">
//           <div className="project-grid">
//             {events === null ? (
//               <div className="events-loading">Loading events…</div>
//             ) : events.length === 0 ? (
//               <div className="events-empty">No events available at the moment.</div>
//             ) : (
//               events.map((item: WebsiteEvent, index: number) => {
//                 const title = getEventTitle(item);
//                 const slug =
//                   item.id && typeof item.id === 'string'
//                     ? String(item.id)
//                     : title
//                         .toLowerCase()
//                         .replace(/\s+/g, '-')
//                         .replace(/[^a-z0-9-]/g, '');

//                 const imageSrc = getEventImage(item);
//                 const category = getEventCategory(item);

//                 return (
//                   <Link key={slug} href={`/events/${slug}`}>
//                     <div className="project-card" ref={index === 0 ? leftRef : rightRef}>
//                       <div className="project-image-wrap">
//                         <Image src={imageSrc} alt={title} fill className="project-image" />
//                       </div>

//                       <div className="project-overlay">
//                         <span className="project-category">{category}</span>

//                         <div className="project-content">
//                           <h3>{title}</h3>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
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

export default function EventsPage() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

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
          <div className="project-grid">
            {events === null ? (
              <div className="events-loading">Loading events…</div>
            ) : events.length === 0 ? (
              <div className="events-empty">No events available at the moment.</div>
            ) : (
              events.map((item, index) => {
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
                        <Image
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
