'use client';

import Link from 'next/link';
import Image from 'next/image';
// import { useParams } from 'next/navigation';
import useScrollAnimation from '../../../hooks/useScrollAnimation';

const article = {
  category: 'Blog',
  title:
    'Healthcare and Life Sciences Companies accelerate their digital journey with AI/ML and Hybrid Cloud',
  author: 'CIO Dialogues Team',
  date: 'June 13, 2022',
  image: '/assets/blogs/blog-1.webp',
  hero: '/assets/blogs/blog-1.webp',
  content: [
    'CIOs have identified the need for Cloud solutions that support R&D, drug discovery, managing patents and identifying other sources of data that can generate potential business value.',
    'Roadblocks in the modernization strategy are data security, audit, compliance, moving core licenses onto cloud and the total cost of adopting, operating, and provisioning cloud infrastructure. A GxP compliant cloud model would help them fast track their journey in leveraging the cloud.',
    'The healthcare and pharmaceutical industry has undergone a technological transformation and that too at a fast pace during the pandemic. There are several factors that are pushing the companies towards a more organized and determined pursuit of digital transformation. Some of these factors are increasing competition, meeting customer demands globally, improving treatment protocols, getting accurate and desired patient outcomes and much more.',
    'At the recent edition of “Digital Leaders Club”, curated by CORE Media and powered by Google Cloud India, CIOs from Healthcare and Life Sciences companies and Google Cloud executives, discussed the digital priorities, their challenges and technology solutions and its potential uses.',
    'Anoop Mathur, Founder & President, CORE Media, facilitated the discussion and in his opening statement he mentioned, “Consumer behaviour has significantly changed in the last 2 years and Healthcare & Life Sciences companies have felt the need to leverage the cloud to be able to understand and meet the changing customer expectations. With the advent of technologies, like AI/ML, analytics and tech enabled smart processes, CIOs are strategizing to solve problems and take advantage of opportunities that have previously been out of reach.”',
  ],
  sections: [
    {
      heading: 'Accelerating with Hybrid Cloud',
      paragraphs: [
        'The CIO of an online pharmacy shared their digital priorities, “We started experimenting with Hybrid Cloud for optimizing cost, to accelerate customer acquisition and optimize cost of transaction. In our business collaboration is key and integrating consumers, doctors, retailers and hospitals requires tech. Our core applications are on-premise and the customer-facing applications are on Cloud. We are touching every point of healthcare and that is why a lot of tech and automation is needed.”',
        'Vice President & Global Head of IT of pharmaceutical product manufacturing mentioned, “For us the major advantage that Cloud brought was the potential to scale faster and enable an agile supply chain. However, data security is critical and data threats are a major concern in healthcare and life sciences.',
        "Sundar Pelapur, Head - Customer Engineering - Conglomerates, & Emerging Businesses - India & SAARC at Google Cloud responded “Our approach is to derive technology solutions based on what's the best model that suits. Each company starts evaluating around the Hybrid world and the approach is to leverage the best of both worlds for the healthcare and life sciences companies.”",
        'Speaking about optimizing cost he emphasized, “The paradigm of cost is not very lateral as in say the company moves to cloud so it is now saving cost. But the perspective of cost analysis here is how Cloud can help take out cost from other functional areas. For example, can it reduce the cost of acquisition of a custom, then it reduces the cost of processing and so on.”',
      ],
    },
    {
      heading: 'Data privacy and connectivity',
      paragraphs: [
        'Digital transformation facilitates cloud-enabled data and services. Cloud supports innovation and R&D with its capacity to store and integrate information across networks and also with its ability to facilitate collaboration and co creation.',
        'However, CIOs have concerns regarding data security. Speaking on this, the GM-IT of a drug company cited, “Cloud has given many advantages. However, Data privacy becomes key in our domain and there is a lot of sensitivity about sharing information. Security and control over data come across as a barrier in further adoption. A clear, tangible return on investment and security compliance, especially from regulatory and IP protection perspectives needs to be assessed.”',
        'Cloud innovation is on the cards for the CIOs, however, they seek solutions that meet regulatory compliance and norms to manage patents.',
        'The CIO of a leading diagnostic company added, “Data Lake gives a lot of actionable insights for different function improvements. However, this data is not ready or presentable for the audits.”',
        'Speaking from a Google Cloud perspective, Ruchir shared, “In order to ensure you know that ease of use from our security compliance standpoint we establish a Zero-Trust model that safeguards the data and data sources.”',
        'Speaking about the audit and regulatory compliance Sundar mentioned, “We have introduced the GxP is an abbreviation referencing the various “good practice” regulations and guidelines that apply to Healthcare and Life Sciences companies that are into manufacturing products. Google Cloud’s administrative, physical, and technical controls are designed to meet quality, documentation, and security objectives of the companies in the sector.”',
        'The technology head of a pharmaceutical company mentioned the challenges of remote monitoring and connectivity.',
        'There is no dearth of technology tools and solutions that can accelerate the digital transformation for Healthcare and Life Sciences companies. However, CIOs in this sector refuse to be lured by technology. They are mindfully strategizing to identify the transformations they want to bring in the organisation and business processes and they seek technology solutions to achieve this transformation.',
      ],
    },
  ],
};

function AnimatedBlock({
  children,
  className = '',
  animationClass = 'animate-fade-in',
  initialTransform = 'translateY(24px)',
}: {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  initialTransform?: string;
}) {
  const ref = useScrollAnimation<HTMLDivElement>({ animationClass, initialTransform });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function BlogDetailsPage() {
  // const params = useParams<{ slug: string }>();
  // const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');
  // const readableSlug = slug.replace(/-/g, ' ');

  return (
    <main className="blog-detail-page">
      {/* <div className="blogpage-container" style={{ paddingBottom: '80px' }}> */}
      <article className="blogpage-card blogpage-stacked">
        <AnimatedBlock
          className="blogpage-media"
          animationClass="animate-fade-in"
          initialTransform="translateY(28px)"
        >
          <Image
            src={article.hero}
            alt={article.title}
            fill
            priority
            className="blogpage-media-image"
          />
        </AnimatedBlock>

        <div className="blogpage-body">
          <AnimatedBlock
            className="blogpage-content"
            animationClass="animate-fade-in-left"
            initialTransform="translateX(-24px)"
          >
            <div className="blogpage-meta">
              <span className="blogpage-category">{article.category}</span>
              <p>
                By <span>{article.author}</span>
              </p>
            </div>

            <h1 className="blogpage-title">{article.title}</h1>
            <div className="blogpage-meta" style={{ marginBottom: '18px' }}>
              Published on {article.date}
            </div>

            <p style={{ marginBottom: '18px', lineHeight: 1.8 }}>{article.content[0]}</p>

            <AnimatedBlock
              className="project-overview"
              animationClass="animate-fade-in"
              initialTransform="translateY(18px)"
            >
              <h3>Project Overview</h3>
              <p className="project-overview-sub">
                A dynamic market, a strong and consistent brand identity is key to standing out and
                driving growth.
              </p>

              <ul className="overview-list">
                <li>
                  <strong>Brand Audit & Research</strong>
                </li>
                <li>
                  <strong>Stakeholder Workshops</strong>
                </li>
                <li>
                  <strong>Customer Experience</strong>
                </li>
                <li>
                  <strong>Launch & Marketing</strong>
                </li>
                <li>
                  <strong>Creative Direction</strong>
                </li>
                <li>
                  <strong>Touchpoints</strong>
                </li>
              </ul>
            </AnimatedBlock>

            {article.sections.map((section) => (
              <AnimatedBlock
                key={section.heading}
                className="blog-section-block"
                animationClass="animate-fade-in"
                initialTransform="translateY(24px)"
              >
                <section style={{ marginTop: '28px' }}>
                  <h2 style={{ marginBottom: '14px' }}>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} style={{ marginBottom: '18px', lineHeight: 1.8 }}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              </AnimatedBlock>
            ))}

            <AnimatedBlock
              className="blog-back-link"
              animationClass="animate-fade-in"
              initialTransform="translateY(18px)"
            >
              <Link href="/blog" className="talk-btn">
                ← Back to Blog
              </Link>
            </AnimatedBlock>
          </AnimatedBlock>
        </div>
      </article>
      {/* </div> */}
    </main>
  );
}
