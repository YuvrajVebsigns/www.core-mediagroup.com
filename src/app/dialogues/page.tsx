'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getAllDialoguesPages, type DialoguePage } from '@/services/dialogues.service';

interface DialogueCard {
  id: string;
  slug: string;
  title: string;
  quote: string;
}

export default function DialoguesPage() {
  const [dialogues, setDialogues] = useState<DialogueCard[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch dialogue pages
  useEffect(() => {
    const fetchDialogues = async () => {
      try {
        setIsLoading(true);
        console.log('DialoguesPage - Fetching dialogues...');

        const pages = await getAllDialoguesPages();

        console.log('DialoguesPage - Fetched pages:', pages);

        if (!pages || pages.length === 0) {
          console.warn('DialoguesPage - No dialogue pages returned from API');
          setDialogues([]);
          return;
        }

        // Map API response to card format
        const mappedDialogues: DialogueCard[] = pages.map((page: DialoguePage) => {
          const quote = extractQuoteFromContent(page.content?.blocks || []) || page.title || '';

          return {
            id: page.id,
            slug: page.slug,
            title: page.title || '',
            quote,
          };
        });

        console.log('DialoguesPage - Mapped dialogues:', mappedDialogues);
        setDialogues(mappedDialogues);
      } catch (error) {
        console.error('DialoguesPage - Error fetching dialogues:', error);
        setDialogues([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDialogues();
  }, []);

  // Extract quote text from content blocks
  const extractQuoteFromContent = (blocks: any[]): string => {
    if (!blocks || blocks.length === 0) return '';

    // Try multiple block types that might contain text
    for (const block of blocks) {
      // Check for paragraph/text blocks
      if (block.data?.text) {
        const text = block.data.text;
        return typeof text === 'string' ? text.substring(0, 200) : '';
      }

      // Check for content field
      if (block.content && typeof block.content === 'string') {
        return block.content.substring(0, 200);
      }

      // Check for description
      if (block.data?.description && typeof block.data.description === 'string') {
        return block.data.description.substring(0, 200);
      }
    }

    return '';
  };

  return (
    <>
      <section className="blog-hero dialogues-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Dialogues"
            fill
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Read Dialogues</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Dialogues</p>
          </div>
        </div>
      </section>

      <section className="dialogues-section">
        <div className="dialogues-container">
          <br />
          <br />

          <div className="dialogues-list">
            {isLoading ? (
              <div style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
                Loading dialogues...
              </div>
            ) : dialogues.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
                No dialogues available
              </div>
            ) : (
              dialogues.map((d, index) => {
                const variant =
                  index % 3 === 0
                    ? 'animate-fade-in-left'
                    : index % 3 === 1
                      ? 'animate-fade-in'
                      : 'animate-fade-in-right';

                const cardKey = d.id;

                return (
                  <AnimatedDialogueCard
                    key={cardKey}
                    cardKey={cardKey}
                    dialogue={d}
                    index={index}
                    variant={variant}
                    expandedCard={expandedCard}
                    setExpandedCard={setExpandedCard}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}

type AnimatedDialogueCardProps = {
  cardKey: string;
  dialogue: DialogueCard;
  index: number;
  variant?: string;
  expandedCard: string | null;
  setExpandedCard: React.Dispatch<React.SetStateAction<string | null>>;
};

function AnimatedDialogueCard({
  cardKey,
  dialogue,
  index,
  variant = 'animate-fade-in',
  expandedCard,
  setExpandedCard,
}: AnimatedDialogueCardProps) {
  const initialTransform = variant.includes('left')
    ? 'translateX(-40px)'
    : variant.includes('right')
      ? 'translateX(40px)'
      : 'translateY(40px)';

  const ref = useScrollAnimation<HTMLDivElement>({
    animationClass: variant,
    initialTransform,
    threshold: 0.12,
    once: false,
  });

  const isExpanded = expandedCard === cardKey;

  return (
    <article ref={ref} className="dialogue-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <Image
        src="/assets/dialoges/quote.png"
        alt="Quote"
        width={56}
        height={56}
        className="dialogue-quote"
      />

      <div className="dialogue-text">
        <p className={`dialogue-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {dialogue.quote}
        </p>

        <button
          type="button"
          className="dialogue-read-more"
          onClick={() => setExpandedCard(isExpanded ? null : cardKey)}
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
}
