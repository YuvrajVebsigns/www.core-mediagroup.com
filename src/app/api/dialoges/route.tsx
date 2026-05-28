import { NextResponse } from 'next/server';

export async function GET() {
  const dialoges = [
    {
      id: 1,
      slug: 'arpanarghya-saha-nimf-digital-first',
      quote:
        'Arpanarghya Saha, Chief Digital Officer at Nippon India Mutual Fund (NIMF), is an industry veteran with 24 years of experience spanning e-commerce, BFSI, and retail. At NIMF, Arpan sparked a digital-first mindset through iterative delivery.',
      author: 'Sendil Kumar Venkatesan',
      role: 'Chief Digital Officer at Nippon India Mutual Fund (NIMF)',
      avatar: '/assets/dialoges/ArpanarghyaSaha.png',
    },
    {
      id: 2,
      slug: 'dialogue-2',
      quote:
        'It was a great experience being a part of CIO Dialogues. It provides an interesting informal opportunity for knowledge sharing, learning from industry peers.',
      author: 'Vinod Bhat',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/VinodBhat.png',
    },
    {
      id: 3,
      slug: 'dialogue-3',
      quote:
        'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/VinodBhat.png',
    },
    {
      id: 4,
      slug: 'dialogue-4',
      quote:
        'CIO Dialogues is a unique experience that helped us in connecting with top CIOs and to better understand each other through an intimate conversation.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.png',
    },
    {
      id: 5,
      slug: 'dialogue-5',
      quote:
        'It was a great experience being a part of CIO Dialogues. It provides an interesting informal opportunity for knowledge sharing, learning from industry peers.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.png',
    },
    {
      id: 6,
      slug: 'dialogue-6',
      quote:
        'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.png',
    },
    {
      id: 6,
      slug: 'dialogue-6',
      quote:
        'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.png',
    },
    {
      id: 6,
      slug: 'dialogue-6',
      quote:
        'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.png',
    },
  ];

  return NextResponse.json(dialoges);
}
