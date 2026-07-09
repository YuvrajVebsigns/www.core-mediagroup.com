'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const DEFAULT_FALLBACK_SRC = '/assets/blogs/blog-1.webp';

interface FallbackImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  ...props
}: FallbackImageProps) {
  const initialSrc = typeof src === 'string' && src.trim() ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  useEffect(() => {
    setCurrentSrc(typeof src === 'string' && src.trim() ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
