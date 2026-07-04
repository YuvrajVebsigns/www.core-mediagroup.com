// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';

// const aboutContent = [
//   `CORE Media was built with a clear purpose—to create meaningful platforms that bring together technology leaders, enterprises, and innovators to exchange ideas, celebrate excellence, and drive business growth.`,

//   `Today, we are proud to be one of India's fastest-growing B2B technology media and marketing companies, delivering proprietary events, Account-Based Marketing (ABM) solutions, and digital engagement platforms that connect brands with the country's most influential ICT decision-makers.`,

//   `From our flagship CIO CHOICE to industry-recognized platforms such as CIO PowerList, CIO CROWN, Data Center & Cloud AI World, and BFSI TechWorld—our initiatives have become trusted destinations for recognizing leadership, fostering collaboration, and shaping conversations that matter across the technology ecosystem.`,

//   `Our digital platform—CIO Dialogues—enables organizations to engage their audiences through relevant insights, strategic storytelling, and impactful experiences.`,

//   `Over the years, our platforms have reached more than 50,000 ICT decision-makers and influencers across key industries, while helping 600+ organizations strengthen relationships, enhance brand visibility, and create meaningful business opportunities. These milestones reflect not only our scale but also the trust our clients and partners continue to place in us.`,

//   `At CORE Media, every initiative is driven by a commitment to deliver value through personalized engagement, quality experiences, and measurable outcomes.`,

//   `The journey ahead is filled with new possibilities, and we remain committed to connecting the right people, ideas, and opportunities to shape the future of technology and business.`,
// ];

// type AnimatedCounterProps = {
//   value: number;
//   suffix?: string;
// };

// function AnimatedCounter({
//   value,
//   suffix = '',
// }: AnimatedCounterProps) {
//   const [count, setCount] = useState(0);
//   const counterRef = useRef<HTMLSpanElement | null>(null);

//   useEffect(() => {
//     const counterElement = counterRef.current;

//     if (!counterElement) {
//       return;
//     }

//     let animationFrame: number | undefined;
//     let hasAnimated = false;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (!entry.isIntersecting || hasAnimated) {
//           return;
//         }

//         hasAnimated = true;

//         const duration = 1500;
//         const startTime = performance.now();

//         const updateCounter = (currentTime: number) => {
//           const progress = Math.min(
//             (currentTime - startTime) / duration,
//             1
//           );

//           const easedProgress =
//             1 - Math.pow(1 - progress, 3);

//           setCount(Math.floor(value * easedProgress));

//           if (progress < 1) {
//             animationFrame =
//               requestAnimationFrame(updateCounter);
//           }
//         };

//         animationFrame =
//           requestAnimationFrame(updateCounter);

//         observer.disconnect();
//       },
//       {
//         threshold: 0.5,
//       }
//     );

//     observer.observe(counterElement);

//     return () => {
//       observer.disconnect();

//       if (animationFrame) {
//         cancelAnimationFrame(animationFrame);
//       }
//     };
//   }, [value]);

//   return (
//     <span ref={counterRef}>
//       {new Intl.NumberFormat('en-IN').format(count)}
//       {suffix}
//     </span>
//   );
// }

// export default function AboutUsPage() {
//   const pageRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     const pageElement = pageRef.current;

//     if (!pageElement) {
//       return;
//     }

//     const revealElements =
//       pageElement.querySelectorAll<HTMLElement>(
//         '[data-reveal]'
//       );

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) {
//             return;
//           }

//           entry.target.classList.add('about-visible');
//           observer.unobserve(entry.target);
//         });
//       },
//       {
//         threshold: 0.12,
//         rootMargin: '0px 0px -50px 0px',
//       }
//     );

//     revealElements.forEach((element) => {
//       observer.observe(element);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   const scrollToFounderMessage = () => {
//     document
//       .getElementById('founder-message')
//       ?.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//       });
//   };

//   return (
//     <main ref={pageRef} className="about-page">
//       {/* Hero section */}
//       <section className="about-hero">
//         <div
//           className="about-hero-decoration about-decoration-one"
//           aria-hidden="true"
//         />

//         <div
//           className="about-hero-decoration about-decoration-two"
//           aria-hidden="true"
//         />

//         <div className="about-container">
//           <div className="about-hero-grid">
//             <div
//               className="about-hero-content"
//               data-reveal
//             >
//               <p className="about-eyebrow">
//                 <span className="about-eyebrow-line" />
//                 Welcome to CORE Media
//               </p>

//               <h1>
//                 Connecting technology,
//                 <span>
//                   {' '}
//                   leadership and opportunity.
//                 </span>
//               </h1>

//               <p className="about-hero-description">
//                 CORE Media creates meaningful platforms that
//                 connect technology leaders, enterprises,
//                 innovators and brands through relevant
//                 conversations and impactful experiences.
//               </p>

//               <div className="about-actions">
//                 <button
//                   type="button"
//                   className="about-primary-button"
//                   onClick={scrollToFounderMessage}
//                 >
//                   Read Founder&apos;s Message
//                   <span aria-hidden="true">↓</span>
//                 </button>

//                 <Link
//                   href="/#contact-section"
//                   className="about-secondary-button"
//                 >
//                   Partner With Us
//                   <span aria-hidden="true">↗</span>
//                 </Link>
//               </div>
//             </div>

//             <aside
//               className="about-impact-panel"
//               data-reveal
//             >
//               <p className="about-panel-title">
//                 Our Impact
//               </p>

//               <article className="about-stat-card">
//                 <strong>
//                   <AnimatedCounter
//                     value={50000}
//                     suffix="+"
//                   />
//                 </strong>

//                 <p>
//                   ICT decision-makers and influencers reached
//                 </p>
//               </article>

//               <article className="about-stat-card">
//                 <strong>
//                   <AnimatedCounter
//                     value={600}
//                     suffix="+"
//                   />
//                 </strong>

//                 <p>
//                   Organizations supported across industries
//                 </p>
//               </article>

//               <div className="about-impact-note">
//                 <span aria-hidden="true" />

//                 <p>
//                   Creating meaningful business opportunities
//                   across the technology ecosystem.
//                 </p>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       {/* Founder message section */}
//       <section
//         id="founder-message"
//         className="about-founder-section"
//       >
//         <div className="about-container">
//           <div className="about-founder-grid">
//             <aside
//               className="about-founder-visual"
//               data-reveal
//             >
//               <div className="about-founder-image-wrapper">
//                 <Image
//                   src="/assets/team/Anoop-Mathur.png"
//                   alt="Anoop Mathur, Founder of CORE Media"
//                   fill
//                   sizes="(max-width: 1000px) 90vw, 450px"
//                   className="about-founder-image"
//                   priority
//                 />
//               </div>

//               <div className="about-founder-card">
//                 <p>Founder, CORE Media</p>

//                 <h2>Anoop Mathur</h2>

//                 <span>
//                   Creating trusted platforms for technology
//                   leadership.
//                 </span>
//               </div>
//             </aside>

//             <article className="about-message-content">
//               <header
//                 className="about-message-header"
//                 data-reveal
//               >
//                 <p className="about-eyebrow">
//                   <span className="about-eyebrow-line" />
//                   Founder&apos;s Message
//                 </p>

//                 <h2>
//                   Purpose-led platforms. Meaningful business
//                   outcomes.
//                 </h2>
//               </header>

//               <div className="about-message-body">
//                 {aboutContent.map((paragraph, index) => (
//                   <p
//                     key={paragraph}
//                     className={
//                       index === 0
//                         ? 'about-message-lead'
//                         : ''
//                     }
//                     data-reveal
//                   >
//                     {paragraph}
//                   </p>
//                 ))}
//               </div>

//               <blockquote
//                 className="about-founder-quote"
//                 data-reveal
//               >
//                 <span
//                   className="about-quote-mark"
//                   aria-hidden="true"
//                 >
//                   “
//                 </span>

//                 <p>
//                   Connecting the right people, ideas and
//                   opportunities to shape the future of
//                   technology and business.
//                 </p>

//                 <footer>— Anoop Mathur</footer>
//               </blockquote>
//             </article>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';

const aboutContent = [
  `CORE Media was built with a clear purpose—to create meaningful platforms that bring together technology leaders, enterprises, and innovators to exchange ideas, celebrate excellence, and drive business growth.`,

  `Today, we are proud to be one of India's fastest-growing B2B technology media and marketing companies, delivering proprietary events, Account-Based Marketing (ABM) solutions, and digital engagement platforms that connect brands with the country's most influential ICT decision-makers.`,

  `From our flagship CIO CHOICE to industry-recognized platforms such as CIO PowerList, CIO CROWN, Data Center & Cloud AI World, BFSI TechWorld—our initiatives have become trusted destinations for recognizing leadership, fostering collaboration, and shaping conversations that matter across the technology ecosystem.`,

  `Our digital platform—CIO Dialogues enable organizations to engage their audiences through relevant insights, strategic storytelling, and impactful experiences.`,

  `Over the years, our platforms have reached more than 50,000 ICT decision-makers and influencers across key industries, while helping 600+ organizations strengthen relationships, enhance brand visibility, and create meaningful business opportunities. These milestones reflect not only our scale but also the trust our clients and partners continue to place in us.`,

  `At CORE Media, every initiative is driven by a commitment to deliver value through personalized engagement, quality experiences, and measurable outcomes.`,

  `The journey ahead is filled with new possibilities, and we remain committed to connecting the right people, ideas, and opportunities to shape the future of technology and business.`,
];

export default function AboutUsPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return;
    }

    const revealElements = page.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('about-text-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    const updateScrollProgress = () => {
      const pageTop = page.offsetTop;
      const pageHeight = page.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY - pageTop;
      const availableScroll = pageHeight - viewportHeight;

      if (availableScroll <= 0) {
        setScrollProgress(100);
        return;
      }

      const progress = Math.min(Math.max((scrollPosition / availableScroll) * 100, 0), 100);

      setScrollProgress(progress);
    };

    updateScrollProgress();

    window.addEventListener('scroll', updateScrollProgress, {
      passive: true,
    });

    window.addEventListener('resize', updateScrollProgress);

    return () => {
      observer.disconnect();

      window.removeEventListener('scroll', updateScrollProgress);

      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <main ref={pageRef} className="about-page">
      {/* Scroll progress bar */}
      <div className="about-scroll-progress" aria-hidden="true">
        <span
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* Page heading */}
      <section className="about-page-heading">
        <div className="about-container">
          <p className="about-page-heading-label">Who We Are</p>

          <h1>About Us</h1>

          <span className="about-page-heading-line" aria-hidden="true" />
        </div>
      </section>

      {/* Background decorations */}
      <div className="about-background-shape about-shape-one" aria-hidden="true" />

      <div className="about-background-shape about-shape-two" aria-hidden="true" />

      {/* About content */}
      <section className="about-content-section">
        <div className="about-container">
          <div className="about-text-list">
            {aboutContent.map((paragraph, index) => {
              const cardClasses = [
                'about-text-card',
                index === 0 ? 'about-text-card-first' : '',
                index === aboutContent.length - 1 ? 'about-text-card-last' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <article
                  key={paragraph}
                  className={cardClasses}
                  data-reveal
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >
                  <span className="about-card-line" aria-hidden="true" />

                  <p>{paragraph}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
