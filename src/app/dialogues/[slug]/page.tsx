// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { getDialoguePageBySlug, type DialoguePage } from '@/services/dialogues.service';

// export default function DialogueDetail({ params }: { params: { slug: string } }) {
//   const { slug } = params;
//   const [dialogue, setDialogue] = useState<DialoguePage | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDialogue = async () => {
//       try {
//         setIsLoading(true);

//         const data = await getDialoguePageBySlug(slug);
//         setDialogue(data);
//       } catch {
//         setDialogue(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDialogue();
//   }, [slug]);

//   if (isLoading) {
//     return <div className="blog-not-found">Loading dialogue...</div>;
//   }

//   if (!dialogue) {
//     return <div className="blog-not-found">Dialogue not found</div>;
//   }

//   const renderContent = () => {
//     if (!dialogue.content?.blocks) {
//       return <p>{dialogue.title}</p>;
//     }

//     return dialogue.content.blocks.map((block, index) => {
//       if (block.type === 'paragraph' && block.data?.text) {
//         return <p key={index}>{block.data.text}</p>;
//       }

//       if (block.type === 'heading' && block.data?.text) {
//         const level = block.data.level || 2;
//         const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

//         return <HeadingTag key={index}>{block.data.text}</HeadingTag>;
//       }

//       return null;
//     });
//   };

//   return (
//     <section className="dialogue-detail">
//       <div className="dialogue-top">
//         <div style={{ position: 'relative', width: '100%', height: '420px' }}>
//           <Image
//             src="/assets/dialoges/quote.png"
//             alt={dialogue.title}
//             fill
//             className="dialogue-detail-image"
//             style={{ objectFit: 'cover' }}
//           />
//         </div>
//       </div>

//       <div className="dialogue-meta">
//         <h1>{dialogue.title}</h1>

//         <p className="dialogue-role">
//           {dialogue.slug} — {new Date().toLocaleDateString()}
//         </p>

//         <blockquote className="dialogue-quote-full">{dialogue.title}</blockquote>

//         <div className="dialogue-content">{renderContent()}</div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type ContentBlock = {
  type?: string;
  content?: string;
  data?: {
    text?: string;
    description?: string;
    level?: number;
  };
};

type DialoguePage = {
  id?: string;
  slug: string;
  title?: string;
  content?: {
    blocks?: ContentBlock[];
  };
};

async function getDialogueBySlug(slug: string): Promise<DialoguePage | null> {
  try {
    const response = await fetch(`/api/dialogues/${encodeURIComponent(slug)}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const result: unknown = await response.json();

    if (typeof result === 'object' && result !== null && 'data' in result) {
      return (result as { data: DialoguePage }).data;
    }

    return result as DialoguePage;
  } catch {
    return null;
  }
}

export default function DialogueDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [dialogue, setDialogue] = useState<DialoguePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDialogue = async () => {
      setIsLoading(true);

      const data = await getDialogueBySlug(slug);

      setDialogue(data);
      setIsLoading(false);
    };

    fetchDialogue();
  }, [slug]);

  const renderContent = () => {
    if (!dialogue?.content?.blocks?.length) {
      return <p>{dialogue?.title || 'No content available.'}</p>;
    }

    return dialogue.content.blocks.map((block: ContentBlock, index: number) => {
      const text = block.data?.text || block.content || block.data?.description || '';

      if (!text) return null;

      if (block.type === 'heading') {
        const level = block.data?.level || 2;

        if (level === 1) return <h1 key={index}>{text}</h1>;
        if (level === 3) return <h3 key={index}>{text}</h3>;
        if (level === 4) return <h4 key={index}>{text}</h4>;

        return <h2 key={index}>{text}</h2>;
      }

      return <p key={index}>{text}</p>;
    });
  };

  if (isLoading) {
    return <div className="blog-not-found">Loading dialogue...</div>;
  }

  if (!dialogue) {
    return <div className="blog-not-found">Dialogue not found</div>;
  }

  return (
    <section className="dialogue-detail">
      <div className="dialogue-top">
        <div style={{ position: 'relative', width: '100%', height: '420px' }}>
          <Image
            src="/assets/dialoges/quote.png"
            alt={dialogue.title || 'Dialogue'}
            fill
            className="dialogue-detail-image"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="dialogue-meta">
        <h1>{dialogue.title || 'Dialogue'}</h1>

        <p className="dialogue-role">{dialogue.slug}</p>

        <blockquote className="dialogue-quote-full">{dialogue.title}</blockquote>

        <div className="dialogue-content">{renderContent()}</div>
      </div>
    </section>
  );
}
