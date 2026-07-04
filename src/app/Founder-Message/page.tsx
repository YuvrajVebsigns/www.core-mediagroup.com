'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const founderMessage = [
  `At CORE Media, our journey has always been driven by a simple belief—meaningful connections create meaningful business outcomes. For over 14 years, we have been bringing together technology leaders, enterprises, innovators, and solution providers, creating platforms that inspire collaboration, recognize excellence, and accelerate business growth across the ICT ecosystem.`,

  `Every brand, platform, and initiative we have built reflects our customer-first philosophy. From proprietary events and executive communities to bespoke marketing programs and digital engagement solutions, our focus has remained constant: helping our clients deliver the right message to the right audience through experiences that are relevant, engaging, and result-oriented.`,

  `In today's fast-evolving digital landscape, expectations continue to rise, challenging us to innovate with purpose. This commitment has enabled us to create community-driven platforms that foster meaningful relationships, facilitate strategic conversations, and generate measurable business impact.`,

  `Our success is built on long-term partnerships founded on trust, collaboration, and shared growth. We believe that every interaction should create value beyond business transactions, strengthening relationships that endure and opportunities that inspire progress.`,

  `As we continue to evolve, our commitment remains unwavering—to create ideas that matter, build communities that thrive, and empower businesses to connect, grow, and lead with confidence.`,

  `Partner with CORE Media, and together, let's connect the dots to create the future of business.`,
];

export default function FounderMessagePage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return;
    }

    const revealElements = page.querySelectorAll<HTMLElement>('[data-reveal]');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    const updateScrollProgress = () => {
      const pageHeight = page.offsetHeight;
      const viewportHeight = window.innerHeight;
      const availableScroll = pageHeight - viewportHeight;

      if (availableScroll <= 0) {
        setScrollProgress(100);
        return;
      }

      const pageTop = page.offsetTop;
      const currentScroll = window.scrollY - pageTop;

      const progress = Math.min(Math.max((currentScroll / availableScroll) * 100, 0), 100);

      setScrollProgress(progress);
    };

    updateScrollProgress();

    window.addEventListener('scroll', updateScrollProgress, {
      passive: true,
    });

    window.addEventListener('resize', updateScrollProgress);

    return () => {
      revealObserver.disconnect();

      window.removeEventListener('scroll', updateScrollProgress);

      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const scrollToMessage = () => {
    document.getElementById('founder-message-content')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main ref={pageRef} className="founder-message-page">
      {/* Reading progress bar */}
      <div className="founder-progress-bar" aria-hidden="true">
        <span
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* Decorative background shapes */}
      <div className="founder-background-shape founder-shape-one" aria-hidden="true" />

      <div className="founder-background-shape founder-shape-two" aria-hidden="true" />

      {/* Hero section */}
      <section className="founder-page-hero">
        <div className="founder-page-container">
          <div className="founder-hero-content" data-reveal>
            <p className="founder-eyebrow">
              <span aria-hidden="true" />
              Leadership Insights
              <span aria-hidden="true" />
            </p>

            <h1>
              Founder&apos;s <span>Message</span>
            </h1>

            <p className="founder-hero-description">
              A message about meaningful connections, trusted partnerships, community-driven
              platforms and the future of business.
            </p>

            <button type="button" className="founder-read-button" onClick={scrollToMessage}>
              Read the Message
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Founder message section */}
      <section id="founder-message-content" className="founder-page-message-section">
        <div className="founder-page-container">
          <div className="founder-page-message-grid">
            {/* Founder profile */}
            <aside className="founder-page-profile-column" data-reveal>
              <div className="founder-page-profile-sticky">
                <div className="founder-page-image-frame">
                  <Image
                    src="/assets/team/Anoop-Mathur.png"
                    alt="Anoop Mathur, Founder of CORE Media"
                    fill
                    priority
                    sizes="(max-width: 950px) 90vw, 430px"
                    className="founder-page-image"
                  />
                </div>

                <div className="founder-page-details">
                  <p>Founder, CORE Media</p>

                  <h2>Anoop Mathur</h2>

                  <span>
                    Building meaningful connections that create meaningful business outcomes.
                  </span>
                </div>
              </div>
            </aside>

            {/* Complete founder message */}
            <article className="founder-page-message-content">
              <header className="founder-page-message-header" data-reveal>
                <p className="founder-eyebrow">
                  <span aria-hidden="true" />
                  Founder&apos;s Message
                </p>

                <h2>Connecting people, ideas and opportunities.</h2>
              </header>

              <div className="founder-paragraph-list">
                {founderMessage.map((paragraph, index) => {
                  const cardClassName = [
                    'founder-message-card',
                    index === 0 ? 'founder-message-card-first' : '',
                    index === founderMessage.length - 1 ? 'founder-message-card-final' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <article
                      key={paragraph}
                      className={cardClassName}
                      data-reveal
                      style={{
                        transitionDelay: `${index * 70}ms`,
                      }}
                    >
                      <span className="founder-card-accent" aria-hidden="true" />

                      <p>{paragraph}</p>
                    </article>
                  );
                })}
              </div>

              {/* Signature quote */}
              <blockquote className="founder-signature-card" data-reveal>
                <span className="founder-quote-mark" aria-hidden="true">
                  “
                </span>

                <p>Meaningful connections create meaningful business outcomes.</p>

                <footer className="founder-signature">
                  <strong>Anoop Mathur</strong>
                  <span>Founder, CORE Media</span>
                </footer>
              </blockquote>

              {/* Page links */}
              <div className="founder-page-actions" data-reveal>
                <Link href="/#contact-section" className="founder-primary-link">
                  Partner With CORE Media
                  <span aria-hidden="true">↗</span>
                </Link>

                {/* <Link
                  href="/about-us"
                  className="founder-secondary-link"
                >
                  About CORE Media
                </Link> */}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
