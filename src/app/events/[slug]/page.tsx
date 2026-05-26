// import Link from 'next/link';

// type Props = {
//   params: { slug: string };
// };

// export default function EventDetailsPage({ params }: Props) {
//   const { slug } = params;

//   // For now we render the same detailed content regardless of slug
//   return (
//     <main className="event-details-page">
//       <div className="event-container">
//         <div className="event-breadcrumb">
//           <Link href="/">Home</Link> &gt; <Link href="/events">Events</Link> &gt; <span>{slug}</span>
//         </div>

//         <h1 className="event-title">Unlocking Agility and Cloud Scalability for Business-Critical Workloads</h1>

//         <div className="event-meta">By CIO Dialogues Team — February 21, 2025</div>

//         <div className="event-content">
//           <p>
//             As enterprises accelerate their digital transformation journeys, modernizing mission-critical
//             workloads running on IBM Power Systems presents both a strategic opportunity and a significant
//             challenge. These legacy environments power core business functions, making their seamless
//             integration with cloud-native ecosystems crucial for achieving operational agility, cost
//             efficiency, and long-term scalability. However, concerns around downtime, performance
//             optimization, and security compliance often slow down migration efforts.
//           </p>

//           <p>
//             In a knowledge exchange session, curated by CORE Media in association with Kyndryl, CIOs and
//             digital leaders explore strategies for seamlessly integrating legacy environments with
//             cloud-native ecosystems to drive agility, scalability, and operational efficiency.
//           </p>

//           <h3>Key Takeaways</h3>
//           <ul>
//             <li>
//               <strong>Seamless Migration Without Disruption:</strong> CIOs discussed how enterprises can
//               migrate IBM Power workloads to the cloud without re-platforming or refactoring, ensuring
//               business continuity and minimizing risks associated with traditional modernization approaches.
//             </li>
//             <li>
//               <strong>Enhancing Agility with Cloud-Native Capabilities:</strong> By integrating cloud-native
//               services with IBM Power workloads, enterprises can enhance flexibility, scale resources
//               dynamically, and optimize costs, allowing them to respond swiftly to changing business needs.
//             </li>
//             <li>
//               <strong>Ensuring Security and Compliance in Hybrid Environments:</strong> The discussion
//               highlighted how a hybrid cloud approach ensures robust security, compliance, and resilience.
//             </li>
//           </ul>

//           <p>
//             The session reinforced that modernizing IBM Power workloads is no longer just an IT initiative—it
//             is a strategic enabler for business transformation. As enterprises navigate their cloud journeys,
//             leveraging Skytap on Azure and expert-led modernization frameworks will be key to unlocking agility,
//             optimizing performance, and ensuring long-term business success.
//           </p>

//           <div className="event-author">About Post Author</div>

//           <div className="event-actions">
//             <Link href="/events" className="talk-btn">
//               ← Back to Events
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// import Image from 'next/image';
// import Link from 'next/link';
import EventDetailsAnimated from '../../../components/EventDetailsAnimated';

type Props = {
  params:
    | Promise<{
        slug: string;
      }>
    | {
        slug: string;
      };
};

const featuredEvent = {
  title: 'Unlocking Business Potential: Innovative Solutions for Unmatched Success',
  author: 'Burhan Nicolas',
  date: '29 December, 2025',
  comments: '03 Comments',
  heroImage: '/assets/blogs/blog-1.webp',
  badge: 'BESPOKE EVENTS',
  summary:
    'In today’s competitive landscape, businesses must continuously adapt and innovate to thrive. Unlocking Business Potential means identifying untapped opportunities and leveraging innovative solutions to drive growth, enhance efficiency, and foster lasting success.',
  sections: [
    {
      heading: 'The opportunity in digital-first business models',
      body: 'Organizations that embrace data-driven decision-making, seamless customer experiences, and operational agility are more likely to create durable growth. The companies that move first usually gain the most from ecosystem partnerships and faster market response.',
    },
    {
      heading: 'Why innovation needs execution',
      body: 'The best ideas fail without implementation. To create meaningful impact, teams need ownership, disciplined execution, measurable milestones, and a feedback loop that keeps the work aligned with business outcomes.',
    },
  ],
  quote:
    'The true entrepreneur is a doer, not a dreamer. Innovation is the catalyst that transforms ideas into reality.',
  quoteAuthor: 'Kevin Hooks',
};

export default async function EventDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const readableSlug = slug.replace(/-/g, ' ');

  return (
    <main className="event-details-page">
      <div className="event-details-shell">
        <EventDetailsAnimated featuredEvent={featuredEvent} readableSlug={readableSlug} />
      </div>
    </main>
  );
}
