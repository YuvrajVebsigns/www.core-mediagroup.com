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

const DIALOGUES_FALLBACK_IMAGE = '/assets/dialoges/AshokNayak.jpg';

function FallbackAvatar({ src, alt }: { src?: string; alt?: string }) {
  const [imgSrc, setImgSrc] = useState<string>(src || DIALOGUES_FALLBACK_IMAGE);

  return (
    // use native img to make error handling straightforward
    <img
      src={imgSrc}
      alt={alt || 'avatar'}
      width={58}
      height={58}
      className="dialogue-avatar"
      onError={() => {
        if (imgSrc !== DIALOGUES_FALLBACK_IMAGE) setImgSrc(DIALOGUES_FALLBACK_IMAGE);
      }}
    />
  );
}

export default function OurDialogues() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null);
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

        const items = await fetchDialoguesFromPage('dialogues');

        if (Array.isArray(items) && items.length > 0) {
          setDialogues(items.slice(0, 3));
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
              alt="About Us"
              width={20}
              height={20}
              className="expertise-label-icon"
            />
            <span className="dialogues-badge-text">Leadership Insights</span>
          </span>
        </div>

        {/* <div className="dialogues-top-bar">
          <h2 className="dialogues-title">
            Our <span>Dialogues</span>
          </h2>
        </div> */}

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
                const isExpanded = expandedCard === dialogue.id;

                return (
                  <article className="dialogue-card" key={dialogue.id}>
                    <Image
                      src="/assets/dialoges/quote.png"
                      alt="Quote"
                      width={56}
                      height={56}
                      className="dialogue-quote"
                    />

                    <div className="dialogue-text">
                      <p
                        className={`dialogue-description ${isExpanded ? 'expanded' : 'collapsed'}`}
                      >
                        {dialogue.quote}
                      </p>

                      <button
                        type="button"
                        className="dialogue-read-more"
                        onClick={() => setExpandedCard(isExpanded ? null : dialogue.id)}
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </button>
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
            <span>More Dialogues</span>
            {/* <span>Read More</span> */}

            <span className="blogs-more-icon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
