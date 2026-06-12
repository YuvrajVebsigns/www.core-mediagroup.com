'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDialoguePageBySlug, type DialoguePage } from '@/services/dialogues.service';

export default function DialogueDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [dialogue, setDialogue] = useState<DialoguePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDialogue = async () => {
      try {
        setIsLoading(true);
        console.log('DialogueDetail - Fetching dialogue for slug:', slug);

        const data = await getDialoguePageBySlug(slug);

        console.log('DialogueDetail - Fetched data:', data);
        setDialogue(data);

        if (!data) {
          console.warn('DialogueDetail - No data returned from API for slug:', slug);
        }
      } catch (error) {
        console.error('DialogueDetail - Error fetching dialogue:', error);
        setDialogue(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDialogue();
  }, [slug]);

  if (isLoading) {
    return <div className="blog-not-found">Loading dialogue...</div>;
  }

  if (!dialogue) {
    return <div className="blog-not-found">Dialogue not found</div>;
  }

  // Extract content for display
  const renderContent = () => {
    if (!dialogue.content?.blocks) {
      return <p>{dialogue.title}</p>;
    }

    return dialogue.content.blocks.map((block, index) => {
      if (block.type === 'paragraph' && block.data?.text) {
        return <p key={index}>{block.data.text}</p>;
      }

      if (block.type === 'heading' && block.data?.text) {
        const level = block.data.level || 2;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return <HeadingTag key={index}>{block.data.text}</HeadingTag>;
      }

      return null;
    });
  };

  return (
    <section className="dialogue-detail">
      <div className="dialogue-top">
        <div style={{ position: 'relative', width: '100%', height: '420px' }}>
          <Image
            src="/assets/dialoges/quote.png"
            alt={dialogue.title}
            fill
            className="dialogue-detail-image"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="dialogue-meta">
        <h1>{dialogue.title}</h1>
        <p className="dialogue-role">
          {dialogue.slug} — {new Date().toLocaleDateString()}
        </p>
        <blockquote className="dialogue-quote-full">{dialogue.title}</blockquote>
        <div className="dialogue-content">{renderContent()}</div>
      </div>
    </section>
  );
}
