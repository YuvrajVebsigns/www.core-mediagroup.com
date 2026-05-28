// import Image from 'next/image';
import Link from 'next/link';
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
        <Link href="/register" className="talk-btn">
          Registration
        </Link>
      </div>
    </main>
  );
}
