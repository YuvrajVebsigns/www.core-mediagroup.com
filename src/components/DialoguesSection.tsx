// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useRef, useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
// import useScrollAnimation from '@/hooks/useScrollAnimation';
// // import { getAllDialoguesPages } from '@/services/dialogues.service';

// interface DialogueCard {
//   id: string;
//   slug: string;
//   title: string;
//   quote: string;
// }

// interface ContentBlock {
//   type?: string;
//   data?: {
//     text?: string;
//   };
// }

// interface DialoguePage {
//   id: string;
//   slug: string;
//   title?: string;
//   content?: {
//     blocks?: ContentBlock[];
//   };
// }

// export default function OurDialogues() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [expandedCard, setExpandedCard] = useState<string | null>(null);
//   const [dialogues, setDialogues] = useState<DialogueCard[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const headingRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-28px)',
//     threshold: 0.1,
//   });

//   const carouselWrapRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in',
//     initialTransform: 'translateY(24px)',
//     threshold: 0.1,
//   });

//   const extractQuoteFromContent = (blocks: ContentBlock[]): string => {
//     if (!blocks.length) return '';

//     const textBlock = blocks.find(
//       (block) => block.type === 'paragraph' || block.type === 'text' || block.data?.text,
//     );

//     const text = textBlock?.data?.text;

//     return typeof text === 'string' ? text.substring(0, 150) : '';
//   };

//   useEffect(() => {
//     const fetchDialogues = async () => {
//       try {
//         setIsLoading(true);

//         const pages = await getAllDialoguesPages();

//         const mappedDialogues: DialogueCard[] = pages.map((page: DialoguePage) => ({
//           id: page.id,
//           slug: page.slug,
//           title: page.title || '',
//           quote: extractQuoteFromContent(page.content?.blocks || []) || page.title || '',
//         }));

//         setDialogues(mappedDialogues);
//       } catch {
//         setDialogues([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDialogues();
//   }, []);

//   const scrollByCard = (direction: number) => {
//     const el = containerRef.current;

//     if (!el) return;

//     const firstCard = el.querySelector<HTMLElement>('.dialogue-card');
//     const cardWidth = firstCard ? firstCard.clientWidth : Math.floor(el.clientWidth / 3);
//     const gap = 28;

//     el.scrollBy({
//       left: direction * (cardWidth + gap),
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <section className="dialogues-section">
//       <div className="dialogues-container">
//         <div className="dialogues-heading" ref={headingRef}>
//           <span className="dialogues-badge">
//             <Image
//               src="/assets/icon.png"
//               alt="About Us"
//               width={20}
//               height={20}
//               className="expertise-label-icon"
//             />
//             <span className="dialogues-badge-text">SUCCESS STORIES</span>
//           </span>
//         </div>

//         <div className="dialogues-top-bar">
//           <h2 className="dialogues-title">
//             Our <span>Dialogues</span>
//           </h2>
//         </div>

//         <div className="dialogues-controls">
//           <button aria-label="Previous" className="dialogues-nav" onClick={() => scrollByCard(-1)}>
//             <ChevronLeft />
//           </button>

//           <button aria-label="Next" className="dialogues-nav" onClick={() => scrollByCard(1)}>
//             <ChevronRight />
//           </button>
//         </div>

//         <div ref={carouselWrapRef}>
//           <div ref={containerRef} className="dialogues-carousel">
//             {isLoading ? (
//               <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>Loading...</div>
//             ) : dialogues.length === 0 ? (
//               <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
//                 No dialogues available
//               </div>
//             ) : (
//               dialogues.map((dialogue) => {
//                 const isExpanded = expandedCard === dialogue.id;

//                 return (
//                   <article className="dialogue-card" key={dialogue.id}>
//                     <Image
//                       src="/assets/dialoges/quote.png"
//                       alt="Quote"
//                       width={56}
//                       height={56}
//                       className="dialogue-quote"
//                     />

//                     <div className="dialogue-text">
//                       <p
//                         className={`dialogue-description ${isExpanded ? 'expanded' : 'collapsed'}`}
//                       >
//                         {dialogue.quote}
//                       </p>

//                       <button
//                         type="button"
//                         className="dialogue-read-more"
//                         onClick={() => setExpandedCard(isExpanded ? null : dialogue.id)}
//                       >
//                         {isExpanded ? 'Read Less' : 'Read More'}
//                       </button>
//                     </div>

//                     <div className="dialogue-divider" />

//                     <div className="dialogue-footer">
//                       <div>
//                         <h4 className="dialogue-author">{dialogue.title}</h4>
//                         <p className="dialogue-role">{dialogue.slug}</p>
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         <div className="blogs-more">
//           <Link href="/dialoges" className="blogs-more-btn">
//             <span>More Dialogues</span>

//             <span className="blogs-more-icon">
//               <ArrowUpRight size={16} />
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface DialogueCard {
  id: string;
  slug: string;
  title: string;
  quote: string;
}

interface ContentBlock {
  type?: string;
  content?: string;
  data?: {
    text?: string;
    description?: string;
  };
}

interface DialoguePage {
  id?: string;
  slug: string;
  title?: string;
  content?: {
    blocks?: ContentBlock[];
  };
}

async function getDialoguesPages(): Promise<DialoguePage[]> {
  try {
    const response = await fetch('/api/dialogues', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) return [];

    const result: unknown = await response.json();

    if (typeof result === 'object' && result !== null && 'data' in result) {
      const data = (result as { data?: DialoguePage[] }).data;
      return Array.isArray(data) ? data : [];
    }

    return Array.isArray(result) ? (result as DialoguePage[]) : [];
  } catch {
    return [];
  }
}

export default function OurDialogues() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [dialogues, setDialogues] = useState<DialogueCard[]>([]);
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

  const extractQuoteFromContent = (blocks: ContentBlock[]): string => {
    if (!blocks.length) return '';

    const textBlock = blocks.find(
      (block) =>
        block.type === 'paragraph' ||
        block.type === 'text' ||
        Boolean(block.data?.text) ||
        Boolean(block.content) ||
        Boolean(block.data?.description),
    );

    const text = textBlock?.data?.text || textBlock?.content || textBlock?.data?.description;

    return typeof text === 'string' ? text.substring(0, 150) : '';
  };

  useEffect(() => {
    const fetchDialogues = async () => {
      try {
        setIsLoading(true);

        const pages = await getDialoguesPages();

        const mappedDialogues: DialogueCard[] = pages.map((page, index) => ({
          id: page.id || page.slug || String(index),
          slug: page.slug,
          title: page.title || '',
          quote: extractQuoteFromContent(page.content?.blocks || []) || page.title || '',
        }));

        setDialogues(mappedDialogues);
      } catch {
        setDialogues([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDialogues();
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
            <span className="dialogues-badge-text">SUCCESS STORIES</span>
          </span>
        </div>

        <div className="dialogues-top-bar">
          <h2 className="dialogues-title">
            Our <span>Dialogues</span>
          </h2>
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
                      <div>
                        <h4 className="dialogue-author">{dialogue.title}</h4>
                        <p className="dialogue-role">{dialogue.slug}</p>
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

            <span className="blogs-more-icon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
