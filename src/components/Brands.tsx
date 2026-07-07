'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Brands() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const [activePage, setActivePage] = useState(0);

  const cardsPerPage = 3;
  const previewWordLimit = 28;

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
      text: 'CIO CHOICE is a very good platform for encouraging ICT brands and shows the trust they have earned from the CIO community. It’s also a great way for CIOs to learn about new products that are trusted by their peers.',
      name: 'CIO Choice',
      writerName: 'Kersi Tavadia | CIO | BSE',
      role: 'CIO Choice',
      image: '/assets/brands/CIO-Choice.png',
    },
    {
      heading: 'CIO Choice',
      text: 'Its extremely rewarding because of all the effort we put in over the years and getting the trust of the CIOs is extremely satisfying. CIO CHOICE is very well recognized by all the leading CIOs in the country. We have been winners in the past also and that has helped us a lot. So, we absolutely plan to leverage this to the maximum in all our branding, collaterals, and presentations to CIOs.',
      name: 'CIO Choice',
      writerName: 'Sharad Sanghi | MD & CEO | NTT-Netmagic',
      role: 'CIO Choice',
      image: '/assets/brands/CIO-Choice.png',
    },
    {
      heading: 'CIO Crown',
      text: 'The event was insightful and outstanding. Thank you, team CORE Media, for celebrating and encouraging innovation and service. Keep up the good work!',
      name: 'CIO Crown',
      writerName: 'Pankaj Khare | IT Head | Pine Labs',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Crown.png',
    },
    {
      heading: 'CIO Crown',
      text: 'CIO CROWN is an engaging platform that has been instrumental in initiating productive conversations with CIOs of some of the top and leading enterprises across verticals. The interactive sessions on the main stage as well as on the sidelines helped us better communicate and understand issues concerning CIOs.',
      name: 'CIO Crown',
      writerName: 'Kaustubh Chandra | Head Marketing & Communications | Dimension Data India',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Crown.png',
    },
    {
      heading: 'Hospitality & Healthcare Honours',
      text: 'The nominees were extremely impressive. The awards will act as a mark of approval that sets them above the rest and cement their position as IT pathbreakers in the healthcare domain.',
      name: 'Hospitality & Healthcare Honours',
      writerName:
        'Vikas Gadre | Adjunct Faculty & Chairperson for IS | NMIMS School of Business Management',
      role: 'H H H',
      image: '/assets/brands/HHH.png',
    },
    {
      heading: 'Hospitality & Healthcare Honours',
      text: 'It is an immense honour to win this prestigious recognition. It spurs us on to go the extra mile and consistently deliver in these constantly changing times.',
      name: 'Hospitality & Healthcare Honours',
      writerName: 'Sumit Singh | CIO | Wockhardt Hospital',
      role: 'H H H',
      image: '/assets/brands/HHH.png',
    },
    {
      heading: 'CIO Powerlist',
      text: 'I feel excited and elated at being a part of CIO PowerList, because it’s one list prepared with the most comprehensive and thorough evaluation.',
      name: 'CIO Powerlist',
      writerName: 'Rajesh Uppal | Senior ED – IT, HR & Education & Training | Maruti Suzuki India',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Powerlist.png',
    },
    {
      heading: 'CIO Powerlist',
      text: 'CIO PowerList brought together the leading technologists of the country and provided an excellent platform for exchanging ideas and points of views. The panel discussions and sessions were quite thought provoking and intense with a number of emerging themes that helped understand some of the expected future developments.',
      name: 'CIO Powerlist',
      writerName: 'Rohan Padhi | Director | KPMG',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Powerlist.png',
    },
    {
      heading: 'Digital Genius Award',
      text: 'I was impressed with the quality and quantity of the nominations. The awards were very well planned and executed, and the sessions and panel discussions were quite relevant and engaging.',
      name: 'Digital Genius Award',
      writerName: 'Anil Jaggia | COO | Avendus Capital & former CIO of HDFC Bank',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/Digital-Genius.png',
    },
    {
      heading: 'Digital Genius Award',
      text: 'Its an amazing feeling to receive this award, after selection by an imminent jury panel. This is a recognition of all the hard work my team and I have put in to give our business a competitive edge',
      name: 'Digital Genius Award',
      writerName: 'Pravin Savant | Group CTO | Mullen Lowe Lintas Group',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/Digital-Genius.png',
    },
    {
      heading: 'CIO Dialogues',
      text: 'It was a great experience being a part of CIO Dialogues. It provides an interesting informal opportunity for knowledge sharing, learning from industry peers, and opens ones mind to new possibilities.',
      name: 'CIO Dialogues',
      writerName: 'Sendil Kumar Venkatesan | VP IT | Shriram Value Services',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/CIO-Dialogues.png',
    },
    {
      heading: 'CIO Dialogues',
      text: 'CIO Dialogues is a unique experience that helped us in connecting with top CIOs and to better understand each other through an intimate conversation. It is one of a kind focused discussion and the networking post event help organization like us to break ice to explore business opportunities as well as to build close relationship with CIOs.',
      name: 'CIO Dialogues',
      writerName:
        'Ankesh Kumar | AGM Channel Marketing & Program Management Greater India Region | Schneider Electric',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/CIO-Dialogues.png',
    },
  ];

  function DialogueCard({ item }: { item: (typeof testimonials)[number] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const words = item.text.split(' ');
    const isLongText = words.length > previewWordLimit;

    const previewText = isLongText ? words.slice(0, previewWordLimit).join(' ') : item.text;

    return (
      <div className="dialogue-card">
        <div className="dialogue-card-content">
          <p className="dialogue-text">
            {isExpanded || !isLongText ? item.text : previewText}

            {isLongText && (
              <>
                {!isExpanded && ' '}
                <button
                  type="button"
                  className="dialogue-readmore-inline"
                  onClick={() => setIsExpanded((value) => !value)}
                >
                  {isExpanded ? 'Show less' : 'Read more...'}
                </button>
              </>
            )}
          </p>
        </div>

        <div className="dialogue-divider" />

        <div className="dialogue-user">
          <div className="dialogue-user-meta">
            <p>{item.writerName}</p>
          </div>

          <div className="dialogue-brand">
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

  const getPageCount = useCallback(
    () => Math.ceil(testimonials.length / cardsPerPage),
    [testimonials.length],
  );

  const scrollToPage = useCallback(
    (pageIndex: number) => {
      const slider = sliderRef.current;

      if (!slider) return;

      const maxPage = getPageCount() - 1;
      const nextPage = Math.max(0, Math.min(pageIndex, maxPage));
      const targetIndex = nextPage * cardsPerPage;
      const child = slider.children[targetIndex] as HTMLElement;

      if (!child) return;

      slider.scrollTo({
        left: child.offsetLeft,
        behavior: 'smooth',
      });

      setActivePage(nextPage);
    },
    [getPageCount],
  );

  const scrollLeft = () => {
    scrollToPage(activePage - 1);
  };

  const scrollRight = () => {
    scrollToPage(activePage + 1);
  };

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
    const slider = sliderRef.current;

    if (!slider) return;

    const onScroll = () => {
      const children = Array.from(slider.children) as HTMLElement[];

      if (!children.length) return;

      const scrollLeftPosition = slider.scrollLeft;
      let nearestPage = 0;
      let nearestDistance = Infinity;

      for (let page = 0; page < getPageCount(); page += 1) {
        const targetIndex = page * cardsPerPage;
        const child = children[targetIndex];

        if (!child) continue;

        const distance = Math.abs(child.offsetLeft - scrollLeftPosition);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestPage = page;
        }
      }

      setActivePage(nearestPage);
    };

    slider.addEventListener('scroll', onScroll);
    onScroll();

    return () => slider.removeEventListener('scroll', onScroll);
  }, [getPageCount]);

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const child = slider.children[index * cardsPerPage] as HTMLElement;

    if (!child) return;

    slider.scrollTo({
      left: child.offsetLeft,
      behavior: 'smooth',
    });

    setActivePage(index);
  };

  return (
    <section className="dialogue-section brands-testimonials">
      <div className="dialogue-container">
        <div className="dialogue-header" ref={headerRef}>
          <div>
            <span className="dialogue-subtitle">
              <Image
                src="/assets/icon.png"
                alt="Testimonials"
                width={20}
                height={20}
                className="expertise-label-icon"
              />

              <span className="dialogue-subtitle-text">TESTIMONIALS</span>
            </span>
          </div>

          <div className="dialogue-arrows">
            <button type="button" className="dialogue-arrow-btn" onClick={scrollLeft}>
              <ChevronLeft size={22} />
            </button>

            <button type="button" className="dialogue-arrow-btn" onClick={scrollRight}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div ref={sliderWrapRef}>
          <div
            className="dialogue-slider"
            ref={sliderRef}
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
            }}
          >
            {testimonials.map((item, index) => (
              <DialogueCard item={item} key={`${item.name}-${index}`} />
            ))}
          </div>

          <div className="dialogue-dots">
            {Array.from({ length: getPageCount() }).map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activePage ? 'dialogue-dot active' : 'dialogue-dot'}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
