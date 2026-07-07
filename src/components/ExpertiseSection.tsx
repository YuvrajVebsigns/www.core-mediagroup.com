'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ExpertiseSection() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(40px)',
  });

  const cardRef1 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef2 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef3 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const features = [
    {
      title: 'CXO Connect',
      description:
        'Facilitating exclusive interactions between technology leaders through executive events, roundtables, and strategic networking platforms.',
      image: '/assets/aboutus/builb-logo.png',
      hoverImage: '/assets/aboutus/builb-logo-dark.png',
    },
    {
      title: 'Strategic Brand Visibility',
      description:
        'Strengthen your brand through thought leadership, industry recognition, digital campaigns, and targeted engagement with influential technology leaders.',
      image: '/assets/aboutus/Award-logo1.png',
      hoverImage: '/assets/aboutus/Award-logo-dark1.png',
    },
    {
      title: 'Data-Driven Growth',
      description:
        'Accelerate business growth with Account-Based Marketing, custom content, and targeted campaigns that generate high-quality leads and measurable results.',
      image: '/assets/aboutus/dedicated-logo.png',
      hoverImage: '/assets/aboutus/dedicated-logo-dark.png',
    },
  ];

  const cardRefs = [cardRef1, cardRef2, cardRef3];

  return (
    <section ref={sectionRef} className="expertise-section">
      <div className="expertise-container">
        <div className="expertise-heading">
          {/* <div className="expertise-label">
            <Image
              src="/assets/icon.png"
              alt="About Us"
              width={20}
              height={20}
              className="expertise-label-icon"
            />

            <span className="expertise-label-text">About Us</span>
          </div> */}

          <h2 className="expertise-title">
            Elevating Brands
            <br />
            Through <span>Strategic Engagement.</span>
          </h2>
        </div>

        <div className="expertise-grid">
          {features.map((feature, index) => (
            <div key={index} ref={cardRefs[index]} className="expertise-card">
              <br />
              <div className="expertise-image-wrapper">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={80}
                  height={60}
                  className={`expertise-image default-image ${index === 0 ? 'expertise-image--small' : ''}`}
                />

                <Image
                  src={feature.hoverImage}
                  alt={feature.title}
                  width={80}
                  height={60}
                  className={`expertise-image hover-image ${index === 0 ? 'expertise-image--small' : ''}`}
                />
              </div>

              <br />
              <br />
              <h3 className="expertise-card-title">{feature.title}</h3>

              <p className="expertise-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
