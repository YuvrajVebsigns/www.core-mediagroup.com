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
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch(() => setVideos([]));
  }, []);

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Videos"
            fill
            priority
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay"></div>

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Play Videos</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Videos</p>
          </div>
        </div>
      </section>

      <section className="videos-section red-theme" style={{ margin: '40px 24px 0' }}>
        <div className="videos-container">
          <div className="project-grid">
            {videos.slice(0, 6).map((v) => (
              <article
                key={v.id}
                className="project-card videos-full-card"
                style={{ height: '450px', minHeight: '450px', background: '#000' }}
              >
                <div
                  className="project-video-wrap"
                  style={{ position: 'absolute', inset: 0, height: '100%' }}
                >
                  <iframe
                    src={`${v.videoUrl}?autoplay=1&rel=0`}
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Play } from 'lucide-react';
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
//       {/* HERO SECTION */}
//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <Image
//             src="/assets/blogs/blog-1.webp"
//             alt="Read Videos"
//             fill
//             priority
//             className="blog-hero-image"
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

//       {/* VIDEOS */}
//       <section className="videos-section red-theme">
//         <div className="videos-container">

//           <div className="videos-grid">
//             {videos.slice(0, 6).map((v) => (
//               <article className="project-card" key={v.id}>

//                 <div className="project-video-wrap">

//                   {/* IF VIDEO ACTIVE */}
//                   {activeVideo === v.id && v.videoUrl ? (
//                     <iframe
//                       src={`${v.videoUrl}?autoplay=1&rel=0`}
//                       title={v.title}
//                       loading="lazy"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   ) : (
//                     <>
//                       {/* THUMBNAIL IMAGE */}
//                       <Image
//                         src={v.image}
//                         alt={v.title}
//                         fill
//                         className="project-thumbnail"
//                         sizes="(max-width:768px) 100vw, 50vw"
//                       />

//                       {/* PLAY BUTTON */}
//                       <button
//                         className="play-btn"
//                         onClick={() => setActiveVideo(v.id)}
//                         aria-label={`Play ${v.title}`}
//                       >
//                         <div className="play-icon">
//                           <Play size={36} />
//                         </div>
//                       </button>
//                     </>
//                   )}

//                 </div>

//                 {/* CONTENT */}
//                 <div className="project-overlay">
//                   <span className="project-category">
//                     {v.category}
//                   </span>

//                   <div className="project-content">
//                     <h3>{v.title}</h3>

//                     <div className="video-info">
//                       <span>{v.author}</span>
//                       <span>{v.date}</span>
//                     </div>
//                   </div>
//                 </div>

//               </article>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
