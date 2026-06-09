'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-icon">❋</span>
            <span className="hero-badge-text">ARCHITECTING THE FUTURE</span>
          </div>

          <h1 className="hero-title">Innovating measurable ways to connect with prospects.</h1>

          <div className="hero-bottom">
            <div className="hero-arrow">
              <img src="/assets/home/arrow.png" alt="Arrow" className="hero-arrow-img" />
            </div>

            <p className="hero-description">
              Represents growth, expansion, and modern business solution present growth, present
              growth, expansion.
            </p>
          </div>

          <button onClick={handleScroll} className="hero-scroll" aria-label="Scroll down">
            <span className="font-semibold">Scroll Down</span>
            <div className="hero-scroll-icon">
              <ArrowDown size={18} />
            </div>
          </button>
        </div>

        <div className="hero-image-area">
          <Image
            src="/assets/hero.png"
            alt="Business Man"
            width={800}
            height={1500}
            priority
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import { ArrowUpRight } from 'lucide-react';

// export default function HeroSection() {
//   return (
//     <section className="hero-section">
//       <div className="hero-pattern" />

//       <div className="hero-container">
//         <div className="hero-left">
//           <span className="hero-small-line" />

//           <p className="hero-side-text">
//             Recognized by industry leaders, our award-winning team has a proven record of delivering
//             excellence across projects.
//           </p>

//           <div className="hero-award">
//             <div className="hero-award-circle">
//               <span className="hero-award-text">AWARD WINNING BUSINESS</span>
//               <strong>w.</strong>
//             </div>
//           </div>
//         </div>

//         <div className="hero-main">
//           <h1>
//             Driving Innovation to Transform Business Futures <ArrowUpRight className="hero-title-icon" />
//           </h1>

//           <div className="hero-bottom-row">
//             <a href="/contact" className="hero-btn">
//               <span>Get Started</span>
//               <span className="hero-btn-icon">
//                 <ArrowUpRight size={18} />
//               </span>
//             </a>

//             <p>
//               Recognized by     industry award leaders, award winning team has be a proven record.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
