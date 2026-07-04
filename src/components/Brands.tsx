'use client';

import { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Brands() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const [activePage, setActivePage] = useState(0);
  const cardsPerPage = 3;

  const headerRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-30px)',
    threshold: 0.1,
  });

  const sliderWrapRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in',
    initialTransform: 'translateY(24px)',
    threshold: 0.1,
  });

  const testimonials = [
    {
      heading: 'CIO Choice',
      text: 'India’s largest online pan-India voting platform, where CIOs vote for their preferred and trusted ICT brands. The voting determines which ICT brands are presented with the CIO Choice recognition at the annual Red Carpet Night.',
      name: 'CIO Choice',
      role: 'CIO Choice',
      image: '/assets/brands/CIO-Choice.png',
    },

    // {
    //   heading: 'CFO Powerlist',
    //   text: 'CFO Power List, an initiative by CORE Media, is a forum for CFO leaders who are committed to addressing major digital world opportunities as part of their core business strategies. Companies value the hard data and empirical mind-set that a finance chief can lend to strategic planning, especially around forecasting trends, building strategic capabilities, or managing government and regulatory relationships.Todays CFOs are responsible for much more than finance. As the new owners of data in a networked economy, CFOs have an unprecedented opportunity to chart the roadmap, add insight and value to the transformation of their enterprise digital agenda. Faced with advances in technology and growing responsibilities, many CFOs are bracing themselves for more change ahead—and understand that they must adapt to be effective.CFO Power List is about honouring the CFOs who are ready for tomorrows demands on finance in the new digital world.CFO Power List aims to bring together Indias top CFO business leaders, influencers, and experts.',
    //   name: 'CIO Powerlist',
    //   role: 'VP IT | Shriram Value Services',
    //   image: '/assets/brands/CFO.png',
    // },
    {
      heading: 'CIO Crown',
      text: 'Meticulously curated gathering of CIOs and CTOs looking to explore, discover, and collaborate through highly interactive formats designed to provide a deeper understanding of new emerging technologies and leadership issues.',
      name: 'CIO Crown',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Crown.png',
    },

    {
      heading: 'Hospitality & Healthcare Honours',
      text: 'The honours recognise outstanding ICT leaders in the hospitality and healthcare industry who have helped drive their organisations to new levels of differentiation and performance.',
      name: 'Hospitality & Healthcare Honours ',
      role: 'H H H',
      image: '/assets/brands/HHH.png',
    },
    {
      heading: 'CIO Powerlist',
      text: 'India’s only algorithm-based selection and annual shortlist of India’s most influential technology leaders.',
      name: 'CIO Powerlist',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Powerlist.png',
    },
    {
      heading: 'IT Genius Award',
      text: 'The awards recognise ICT leaders who have implemented transformational, critical, and disruptive projects with revolutionary impact. Day-to-day IT implementation projects are excluded from consideration.',
      name: 'IT Genius Award',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/Genius.png',
    },
    {
      heading: 'CIO Dialogues',
      text: 'Informal, highly interactive sessions limited to a select few CIOs to engage in candid conversations and build connections in a relaxed setting crafted to deliver a unique experience. No more than 10 CIOs participate in each evening session, designed to enable knowledge sharing and gain insights on a specific topic. Each of these sessions is in exclusive partnership with ICT brands and held across multiple cities.',
      name: 'CIO Dialogues',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/CIO-Dialogues.png',
    },
    {
      heading: 'Leadernext',
      text: 'LeaderNext is an innovative platform dedicated to recognizing and propelling the professional growth of senior IT & digital executives. With a vision set on the future, it is all about nurturing the next wave of technology leaders who are poised to revolutionize business with their forward-thinking approach and adeptness in emerging technologies.LeaderNext is more than an acknowledgement – it is the beginning of a journey towards leadership excellence. Do not miss the chance to be part of this transformative experience. Join us and shape the future of the ICT sector!',
      name: 'Leadernext',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/Leadernext.png',
    },
  ];

  // We'll access vendor-specific style properties via a narrow local cast to avoid `any` and
  // to prevent extending DOM types incorrectly.

  function DialogueCard({ item }: { item: (typeof testimonials)[number] }) {
    const pRef = useRef<HTMLParagraphElement | null>(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const [applyClamp, setApplyClamp] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useLayoutEffect(() => {
      const p = pRef.current;
      if (!p) return;

      // Measure full height without clamp by temporarily disabling clamp
      const prevDisplay = p.style.display;
      const style = p.style as unknown as {
        webkitLineClamp?: string | number | undefined;
        webkitBoxOrient?: string | undefined;
      };
      const prevWebkitBoxOrient = style.webkitBoxOrient;
      const prevWebkitLineClamp = style.webkitLineClamp;

      // Ensure full natural height is measurable
      p.style.display = 'block';
      style.webkitLineClamp = 'none';
      style.webkitBoxOrient = 'vertical';

      const computed = getComputedStyle(p);
      const lineHeight = parseFloat(computed.lineHeight || '18');
      const lines = Math.round(p.scrollHeight / lineHeight);

      // restore any inline styles we changed (we'll apply clamp via state)
      p.style.display = prevDisplay;
      style.webkitLineClamp = prevWebkitLineClamp;
      style.webkitBoxOrient = prevWebkitBoxOrient;

      if (lines > 7) setIsOverflow(true);
      // apply clamp after measurement to avoid layout jump
      setApplyClamp(true);
    }, [item.text]);

    return (
      <div
        className="dialogue-card"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <div style={{ flex: '1 1 auto' }}>
          <p
            ref={pRef}
            className="dialogue-text"
            style={
              applyClamp && !isExpanded
                ? ({
                    display: '-webkit-box',
                    WebkitLineClamp: 7,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  } as React.CSSProperties)
                : undefined
            }
          >
            {item.text}
          </p>
        </div>
        {isOverflow && (
          <div className="dialogue-readmore" style={{ marginTop: 5 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded((v) => !v);
              }}
            >
              {isExpanded ? 'Show less' : 'Read more...'}
            </a>
          </div>
        )}
        <div className="dialogue-divider" />

        <div style={{ marginTop: 12 }}>
          <div className="dialogue-user" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image
              src={item.image}
              alt={item.name}
              width={70}
              height={70}
              className="dialogue-user-image"
            />

            <div>
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const scrollLeft = () => {
    scrollToPage(activePage - 1);
  };

  const scrollRight = () => {
    scrollToPage(activePage + 1);
  };

  const getPageCount = useCallback(
    () => Math.ceil(testimonials.length / cardsPerPage),
    [testimonials.length, cardsPerPage],
  );

  const scrollToPage = useCallback(
    (pageIndex: number) => {
      const el = sliderRef.current;
      if (!el) return;

      const maxPage = getPageCount() - 1;
      const nextPage = Math.max(0, Math.min(pageIndex, maxPage));
      const targetIndex = nextPage * cardsPerPage;
      const child = el.children[targetIndex] as HTMLElement;

      if (!child) return;

      el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      setActivePage(nextPage);
    },
    [cardsPerPage, getPageCount],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (!sliderRef.current) return;

      const maxPage = getPageCount() - 1;

      if (activePage >= maxPage) {
        scrollToPage(0);
      } else {
        scrollToPage(activePage + 1);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activePage, getPageCount, scrollToPage]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      const scrollLeftPos = el.scrollLeft;
      let nearestPage = 0;
      let nearestDist = Infinity;

      for (let page = 0; page < getPageCount(); page += 1) {
        const targetIndex = page * cardsPerPage;
        const child = children[targetIndex];
        if (!child) continue;

        const dist = Math.abs(child.offsetLeft - scrollLeftPos);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestPage = page;
        }
      }

      setActivePage(nearestPage);
    };

    el.addEventListener('scroll', onScroll);
    onScroll();

    return () => el.removeEventListener('scroll', onScroll);
  }, [getPageCount]);

  const scrollToIndex = (idx: number) => {
    const el = sliderRef.current;
    if (!el) return;

    const child = el.children[idx * cardsPerPage] as HTMLElement;
    if (!child) return;

    el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
    setActivePage(idx);
  };

  return (
    <section className="dialogue-section">
      <div className="dialogue-container">
        <div className="dialogue-header" ref={headerRef}>
          <div>
            <span className="dialogue-subtitle">
              <Image
                src="/assets/icon.png"
                alt="About Us"
                width={20}
                height={20}
                className="expertise-label-icon"
              />
              <span className="dialogue-subtitle-text">TESTIMONIALS</span>
            </span>

            {/* <h2 className="dialogue-title">
              Our <span>Brands</span>
            </h2> */}
          </div>

          <div className="dialogue-arrows">
            <button className="dialogue-arrow-btn" onClick={scrollLeft}>
              <ChevronLeft size={22} />
            </button>

            <button className="dialogue-arrow-btn" onClick={scrollRight}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div ref={sliderWrapRef}>
          <div
            className="dialogue-slider"
            ref={sliderRef}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => (isPausedRef.current = false)}
          >
            {testimonials.map((item, index) => (
              <DialogueCard item={item} key={index} />
            ))}
          </div>

          <div className="dialogue-dots">
            {Array.from({ length: getPageCount() }).map((_, idx) => (
              <button
                key={idx}
                className={idx === activePage ? 'dialogue-dot active' : 'dialogue-dot'}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
