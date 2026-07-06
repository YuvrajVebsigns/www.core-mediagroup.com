'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// type ContentBlock = {
//   type?: string;
//   content?: string;
//   data?: {
//     text?: string;
//     description?: string;
//   };
// };

// type DialoguePage = {
//   id?: string;
//   slug: string;
//   title?: string;
//   content?: {
//     blocks?: ContentBlock[];
//   };
// };

type DialoguePage = {
  id: number;
  slug: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

// type DialogueCard = {
//   id: string;
//   slug: string;
//   title: string;
//   quote: string;
// };

type DialogueCard = {
  id: string;
  slug: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};
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

const DIALOGUES_FALLBACK_IMAGE = '/assets/dialoges/AshokNayak.jpg';

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

// function extractQuoteFromContent(blocks: ContentBlock[]): string {
//   if (!blocks.length) return '';

//   for (const block of blocks) {
//     if (typeof block.data?.text === 'string') {
//       return block.data.text.substring(0, 200);
//     }

//     if (typeof block.content === 'string') {
//       return block.content.substring(0, 200);
//     }

//     if (typeof block.data?.description === 'string') {
//       return block.data.description.substring(0, 200);
//     }
//   }

//   return '';
// }

export default function DialoguesPage() {
  const [dialogues, setDialogues] = useState<DialogueCard[]>([]);
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

  useEffect(() => {
    const fetchDialogues = async () => {
      setIsLoading(true);

      const pages = await getDialoguesPages();

      const mappedDialogues = pages.map((page) => ({
        id: String(page.id),
        slug: page.slug,
        author: page.author,
        role: page.role,
        quote: page.quote,
        avatar: page.avatar,
      }));

      setDialogues(mappedDialogues);
      setIsLoading(false);
    };

    fetchDialogues();
  }, []);

  return (
    <>
      <section className="blog-hero dialogues-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Dialogues"
            fill
            className="blog-hero-image"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement | null;
              if (img && img.src.indexOf(DIALOGUES_FALLBACK_IMAGE) === -1) {
                img.src = DIALOGUES_FALLBACK_IMAGE;
              }
            }}
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
              dialogues.map((dialogue, index) => {
                const variant =
                  index % 3 === 0
                    ? 'animate-fade-in-left'
                    : index % 3 === 1
                      ? 'animate-fade-in'
                      : 'animate-fade-in-right';

                return (
                  <AnimatedDialogueCard
                    key={dialogue.id}
                    dialogue={dialogue}
                    index={index}
                    variant={variant}
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
  dialogue: DialogueCard;
  index: number;
  variant?: string;
};

function AnimatedDialogueCard({
  dialogue,
  index,
  variant = 'animate-fade-in',
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

  const isExpanded = false;

  return (
    <article ref={ref} className="dialogue-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <Image
        src="/assets/dialoges/icon22.png"
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
          onClick={() =>
            window.open('https://ciodialogues.com/index.php/category/cio-voice/', '_blank')
          }
        >
          Read More
        </button>
      </div>

      <div className="dialogue-divider" />

      <div className="dialogue-footer">
        <FallbackAvatar src={dialogue.avatar} alt={dialogue.author} />

        <div className="dialogue-author-info">
          <h4 className="dialogue-author">{dialogue.author}</h4>
          <p className="dialogue-role">{dialogue.role}</p>
        </div>
      </div>
    </article>
  );
}
