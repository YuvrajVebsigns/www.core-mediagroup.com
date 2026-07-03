'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <p className="about-eyebrow">WELCOME TO CORE MEDIA</p>

              <h1>
                Connecting technology,
                <span> leadership and opportunity.</span>
              </h1>

              <p className="about-hero-description">
                We create trusted platforms where technology leaders, enterprises, innovators and
                brands come together to exchange ideas, celebrate excellence and build meaningful
                business relationships.
              </p>

              <div className="about-actions">
                <a href="#founder-message" className="about-primary-button">
                  Read Founder&apos;s Message
                </a>

                <Link href="/contact" className="about-secondary-button">
                  Partner With Us
                </Link>
              </div>
            </div>

            <div className="about-impact-panel">
              <p className="about-panel-title">OUR IMPACT</p>

              <article className="about-stat-card">
                <strong>50,000+</strong>
                <p>ICT decision-makers and influencers reached</p>
              </article>

              <article className="about-stat-card">
                <strong>600+</strong>
                <p>Organizations supported across industries</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="founder-message" className="about-founder-section">
        <div className="about-container">
          <div className="about-founder-grid">
            <div className="about-founder-visual">
              <div className="about-founder-image-wrapper">
                <Image
                  src="/assets/team/Anoop-Mathur.png"
                  alt="Anoop Mathur, Founder of CORE Media"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="about-founder-image"
                  priority
                />
              </div>

              <div className="about-founder-card">
                <p>FOUNDER, CORE MEDIA</p>
                <h2>Anoop Mathur</h2>
                <span>Creating trusted platforms for technology leadership.</span>
              </div>
            </div>

            <div className="about-message-content">
              <p className="about-eyebrow">FOUNDER&apos;S MESSAGE</p>

              <h2>Purpose-led platforms. Meaningful business outcomes.</h2>

              <div className="about-message-body">
                <p>
                  CORE Media was built with a clear purpose—to create meaningful platforms that
                  bring together technology leaders, enterprises, and innovators to exchange ideas,
                  celebrate excellence, and drive business growth.
                </p>

                <p>
                  Today, we are proud to be one of India&apos;s fastest-growing B2B technology media
                  and marketing companies, delivering proprietary events, Account-Based Marketing
                  solutions, and digital engagement platforms that connect brands with the
                  country&apos;s most influential ICT decision-makers.
                </p>

                <p>
                  From our flagship CIO CHOICE to industry-recognized platforms such as CIO
                  PowerList, CIO CROWN, Data Center &amp; Cloud AI World, and BFSI TechWorld—our
                  initiatives have become trusted destinations for recognizing leadership, fostering
                  collaboration, and shaping conversations that matter across the technology
                  ecosystem.
                </p>

                <p>
                  Our digital platform—CIO Dialogues—enables organizations to engage their audiences
                  through relevant insights, strategic storytelling, and impactful experiences.
                </p>

                <p>
                  Over the years, our platforms have reached more than 50,000 ICT decision-makers
                  and influencers across key industries, while helping 600+ organizations strengthen
                  relationships, enhance brand visibility, and create meaningful business
                  opportunities.
                </p>

                <p>
                  At CORE Media, every initiative is driven by a commitment to deliver value through
                  personalized engagement, quality experiences, and measurable outcomes.
                </p>

                <p>
                  The journey ahead is filled with new possibilities, and we remain committed to
                  connecting the right people, ideas, and opportunities to shape the future of
                  technology and business.
                </p>
              </div>

              <blockquote className="about-founder-quote">
                “We remain committed to connecting the right people, ideas, and opportunities to
                shape the future of technology and business.”
                <footer>— Anoop Mathur</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
