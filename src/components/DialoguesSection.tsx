'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { fetchDialoguesFromPage } from '@/services/dialogues.service';

type Dialogue = {
  id: number | string;
  slug?: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

type DialogueRawItem = {
  id?: string | number;
  slug?: string;
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
};

function FallbackAvatar({ src, alt }: { src?: string; alt?: string }) {
  const [hasError, setHasError] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return 'YS';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'YS';
    if (parts.length === 1) return parts[0]?.slice(0, 2).toUpperCase() ?? 'YS';
    const first = parts[0]?.[0] ?? '';
    const last = parts[parts.length - 1]?.[0] ?? '';
    return (first + last).toUpperCase() || 'YS';
  };

  const initials = getInitials(alt);

  if (!src || hasError) {
    return (
      <div
        className="dialogue-avatar-fallback"
        style={{
          width: 58,
          height: 58,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 9999,
          background: '#222',
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
        }}
        aria-hidden
        title={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || 'avatar'}
      width={58}
      height={58}
      className="dialogue-avatar"
      unoptimized
      onError={() => setHasError(true)}
    />
  );
}

function renderQuoteWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, idx) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={`${part}-${idx}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="dialogue-link"
        >
          {part}
        </a>
      );
    }

    return <span key={`${part}-${idx}`}>{part}</span>;
  });
}

export default function OurDialogues() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const headingRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-28px)',
    threshold: 0.1,
  });

  const carouselWrapRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in',
    initialTransform: 'translateY(24px)',
    threshold: 0.1,
  });

  useEffect(() => {
    const loadDialogues = async () => {
      try {
        setIsLoading(true);

        const items = (await fetchDialoguesFromPage('dialogues')) as DialogueRawItem[];

        if (Array.isArray(items) && items.length > 0) {
          const mapped = items.slice(0, 3).map((item) => ({
            id: item.id ?? String(Math.random()),
            slug: item.slug ?? String(item.id ?? ''),
            quote: item.quote ?? '',
            author: item.author ?? 'Unknown',
            role: item.role ?? '',
            avatar: item.avatar ?? '',
          }));
          setDialogues(mapped);
        } else {
          setDialogues([]);
        }
      } catch {
        setDialogues([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDialogues();
  }, []);

  const extractFirstLink = (text: string): string | null => {
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  };

  const toggleExpanded = (id: number | string, quote: string) => {
    const link = extractFirstLink(quote);
    if (link) {
      window.open(link, '_blank', 'noopener noreferrer');
    }
  };

  const scrollByCard = (direction: number) => {
    const el = containerRef.current;

    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>('.dialogue-card');
    const cardWidth = firstCard ? firstCard.clientWidth : Math.floor(el.clientWidth / 3);
    const gap = 28;

    el.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section className="dialogues-section">
      <div className="dialogues-container">
        <div className="dialogues-heading" ref={headingRef}>
          <span className="dialogues-badge">
            <Image
              src="/assets/icon.png"
              alt="Leadership Insights"
              width={22}
              height={22}
              className="expertise-label-icon"
            />
            <span className="dialogues-badge-text">LEADERSHIP INSIGHTS</span>
          </span>
        </div>

        <div className="dialogues-controls">
          <button aria-label="Previous" className="dialogues-nav" onClick={() => scrollByCard(-1)}>
            <ChevronLeft />
          </button>

          <button aria-label="Next" className="dialogues-nav" onClick={() => scrollByCard(1)}>
            <ChevronRight />
          </button>
        </div>

        <div ref={carouselWrapRef}>
          <div ref={containerRef} className="dialogues-carousel">
            {isLoading ? (
              <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>Loading...</div>
            ) : dialogues.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
                No dialogues available
              </div>
            ) : (
              dialogues.map((dialogue) => {
                const previewText =
                  dialogue.quote.length > 180
                    ? `${dialogue.quote.slice(0, 180).trim()}...`
                    : dialogue.quote;

                return (
                  <article className="dialogue-card" key={dialogue.id}>
                    <Image
                      src="/assets/dialoges/icon22.png"
                      alt="Quote"
                      width={56}
                      height={56}
                      className="dialogue-quote"
                    />

                    <div className="dialogue-text">
                      <p className="dialogue-description">{renderQuoteWithLinks(previewText)}</p>

                      {dialogue.quote.length > 180 ? (
                        <button
                          type="button"
                          className="dialogue-read-more"
                          onClick={() => toggleExpanded(dialogue.id, dialogue.quote)}
                        >
                          Read More
                        </button>
                      ) : null}
                    </div>

                    <div className="dialogue-divider" />
                    <div className="dialogue-footer">
                      <FallbackAvatar src={dialogue.avatar} alt={dialogue.author} />

                      <div>
                        <h4 className="dialogue-author">{dialogue.author}</h4>
                        <p className="dialogue-role">{dialogue.role}</p>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        <div className="blogs-more">
          <Link href="/dialogues" className="blogs-more-btn">
            <span>Read More </span>
            <span className="blogs-more-icon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
