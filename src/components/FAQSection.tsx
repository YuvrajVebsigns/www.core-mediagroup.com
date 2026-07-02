'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, Phone } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const leftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-32px)',
    threshold: 0.1,
  });
  const rightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(32px)',
    threshold: 0.1,
  });

  const faqs = [
    {
      question: 'What does CORE Media specialize in?',
      answer:
        'Delivering B2B technology events, marketing solutions, and executive engagement platforms.',
    },
    {
      question: 'What industries does CORE Media serve?',
      answer:
        'Technology, BFSI, manufacturing, healthcare, retail, telecom, and enterprise sectors.',
    },
    {
      question: 'How can my organization partner with CORE Media?',
      answer:
        'Collaborate through sponsorships, speaking opportunities, campaigns, and strategic partnerships.',
    },
    {
      question: 'What are CORE Media flagship events?',
      answer:
        'CIO CHOICE India (January), CIO CHOICE MEA (January), CIO CHOICE ASEAN (February), Data Center & Cloud AI World (May), CIO PowerList India (June), BFSI TechWorld (August), CIO PowerList MEA (September), CIO CROWN (October), and CIO PowerList SEA (November)',
    },
  ];

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-wrapper">
          {/* LEFT SIDE */}
          <div className="faq-left" ref={leftRef}>
            <div className="faq-image-wrap">
              <Image src="/assets/service-1.png" alt="FAQ" fill className="faq-image" />

              <div className="faq-overlay"></div>

              <h2 className="faq-heading">
                {/* Need */} FAQs
                <br />
                <br />
                {/* Start */}
                <br />
                {/* Here... */}
              </h2>

              {/* CALL CARD */}
              <div className="faq-call-card">
                <h3>
                  Need
                  <br />
                  Assistance?
                </h3>

                <div className="faq-call-row">
                  <div className="faq-call-icon">
                    <Phone size={18} />
                  </div>

                  <a href="tel:18884521505">7506035537</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="faq-right" ref={rightRef}>
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                >
                  <span>{faq.question}</span>

                  <div className="faq-icon">
                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
