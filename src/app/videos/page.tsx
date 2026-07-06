// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// interface VideoItem {
//   id: number;
//   slug: string;
//   title: string;
//   category: string;
//   author: string;
//   date: string;
//   image: string;
//   videoUrl?: string;
// }

// export default function VideosPage() {
//   const [videos, setVideos] = useState<VideoItem[]>([]);
//   const [activeVideo, setActiveVideo] = useState<number | null>(null);

//   const heroMediaRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const heroContentRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   useEffect(() => {
//     fetch('/api/videos')
//       .then((res) => res.json())
//       .then((data) => setVideos(data))
//       .catch(() => setVideos([]));
//   }, []);

//   return (
//     <>
//       {/* HERO */}
//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <img
//             src="/assets/blogs/blog-1.webp"
//             alt="Read Videos"
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           />
//         </div>

//         <div className="blog-hero-overlay"></div>

//         <div className="blog-hero-content" ref={heroContentRef}>
//           <h1>Play Videos</h1>

//           <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               🏦 Home
//             </Link>
//             <span>&gt;</span>
//             <p>Videos</p>
//           </div>
//         </div>
//       </section>

//       {/* VIDEO GRID */}
//       <section className="videopage-section" style={{ margin: '40px 24px 0' }}>
//         <div className="videopage-container">
//           <div className="videopage-grid">

//             {videos.slice(0, 6).map((v) => (
//               <article key={v.id} className="videopage-card">
//                 <div className="videopage-video-wrap">

//                   {/* IFRAME ALWAYS LOADED (NO BLACK SCREEN) */}
//                   <iframe
//                     src={`${v.videoUrl}?rel=0&enablejsapi=1`}
//                     title={v.title}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     style={{
//                       position: 'absolute',
//                       inset: 0,
//                       width: '100%',
//                       height: '100%',
//                       border: 0,
//                       pointerEvents: activeVideo === v.id ? 'auto' : 'none',
//                     }}
//                   />

//                   {/* TRANSPARENT PAUSE OVERLAY */}
//                   {activeVideo !== v.id && (
//                     <div
//                       onClick={() => setActiveVideo(v.id)}
//                       style={{
//                         position: 'absolute',
//                         inset: 0,
//                         background: 'rgba(0,0,0,0.35)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         cursor: 'pointer',
//                         zIndex: 2,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: '72px',
//                           height: '72px',
//                           borderRadius: '50%',
//                           background: 'rgba(180,0,0,0.85)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: '#fff',
//                           fontSize: '18px',
//                           fontWeight: 700,
//                         }}
//                       >
//                         ▶
//                       </div>
//                     </div>
//                   )}

//                 </div>
//               </article>
//             ))}

//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface VideoItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  videoUrl?: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

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
    // Replace API fetch with fixed list of provided YouTube videos
    const list: VideoItem[] = [
      {
        id: 1,
        slug: 'v1',
        title: 'Video 1',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/KEpYlaux9rc',
      },
      {
        id: 2,
        slug: 'v2',
        title: 'Video 2',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/xiJs0XmPJyE',
      },
      {
        id: 3,
        slug: 'v3',
        title: 'Video 3',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/JBdGQoGFJqU',
      },
      {
        id: 4,
        slug: 'v4',
        title: 'Video 4',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/jiJYiesC42s',
      },
      {
        id: 5,
        slug: 'v5',
        title: 'Video 5',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/H_2UBj6k5oE',
      },
      {
        id: 6,
        slug: 'v6',
        title: 'Video 6',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/vq01USo0Rno',
      },
      {
        id: 7,
        slug: 'v7',
        title: 'Video 7',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/czlsVK63gkk',
      },
      {
        id: 8,
        slug: 'v8',
        title: 'Video 8',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/vGV0GsV0y0E',
      },
      {
        id: 9,
        slug: 'v9',
        title: 'Video 9',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/vGV0GsV0y0E',
      },
      {
        id: 10,
        slug: 'v10',
        title: 'Video 10',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
      },
      {
        id: 11,
        slug: 'v11',
        title: 'Video 11',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/LzAe0IFyJHQ',
      },
      {
        id: 12,
        slug: 'v12',
        title: 'Video 12',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/t0G9AuwNJyI',
      },
      {
        id: 13,
        slug: 'v13',
        title: 'Video 13',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/-tW3ffpdTpE',
      },
      {
        id: 14,
        slug: 'v14',
        title: 'Video 14',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
      },
      {
        id: 15,
        slug: 'v15',
        title: 'Video 15',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/hqLGiBrTOxU',
      },
      {
        id: 16,
        slug: 'v16',
        title: 'Video 16',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/_3LCkVImqBM',
      },
      {
        id: 17,
        slug: 'v17',
        title: 'Video 17',
        category: '',
        author: '',
        date: '',
        image: '',
        videoUrl: 'https://www.youtube.com/embed/LjHzt9BNqS4',
      },
    ];

    setVideos(list);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Videos"
            fill
            className="blog-hero-image"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>

        <div className="blog-hero-overlay"></div>

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Video Library</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Videos</p>
          </div>
        </div>
      </section>

      {/* VIDEO GRID */}
      <section className="videopage-section" style={{ margin: '40px 24px 0' }}>
        <div className="videopage-container">
          <div className="videopage-grid">
            {videos.map((v) => (
              <article key={v.id} className="videopage-card">
                <div className="videopage-video-wrap">
                  {/* VIDEO */}
                  <iframe
                    src={
                      activeVideo === v.id
                        ? `${v.videoUrl}?autoplay=1&rel=0`
                        : `${v.videoUrl}?rel=0`
                    }
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />

                  {/* OVERLAY */}
                  {activeVideo !== v.id && (
                    <div
                      onClick={() => setActiveVideo(v.id)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2,
                        transition: '0.3s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          background: 'rgba(180,0,0,0.85)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '24px',
                          fontWeight: 700,
                          boxShadow: '0 8px 30px rgba(164,0,0,0.25)',
                        }}
                      >
                        ▶
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
