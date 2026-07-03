import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

import { CORE_MEDIA_KNOWLEDGE, CORE_MEDIA_PAGES, type BotLink } from '@/lib/coreMediaBot';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ChatRequestBody = {
  message?: unknown;
  previousInteractionId?: unknown;
};

const PAGE_INFORMATION = CORE_MEDIA_PAGES.map(
  (page) => `- ${page.title}: ${page.description} Website path: ${page.href}`,
).join('\n');

const SYSTEM_INSTRUCTION = `
You are the official website assistant for CORE Media.

Your purpose is to help website visitors:

- Understand CORE Media
- Learn about its services
- Find events, blogs, videos and reports
- Learn about CORE Media platforms and initiatives
- Find registration information
- Find contact and partnership information
- Open the correct page on the website

APPROVED CORE MEDIA INFORMATION

${CORE_MEDIA_KNOWLEDGE}

AVAILABLE WEBSITE PAGES

${PAGE_INFORMATION}

IMPORTANT RESPONSE RULES

1. Answer only using the approved information supplied above.
2. Reply in the same language used by the visitor.
3. You can understand English, Hindi and simple Hinglish.
4. Keep every answer brief, clear and professional.
5. Recommend the exact website page when relevant.
6. Do not invent event dates, prices, speakers or client names.
7. Do not make up registration requirements.
8. Do not claim that you submitted a form.
9. Do not claim that you completed a registration.
10. When information is unavailable, recommend contacting CORE Media.
11. Never ask for passwords, OTPs, API keys or payment information.
12. Do not answer unrelated questions.
13. Use plain text and short paragraphs.
`.trim();

function getSuggestedLinks(message: string): BotLink[] {
  const normalizedMessage = message.toLowerCase();

  const matchingPages = CORE_MEDIA_PAGES.filter((page) =>
    page.keywords.some((keyword) => normalizedMessage.includes(keyword.toLowerCase())),
  );

  const selectedPages =
    matchingPages.length > 0
      ? matchingPages.slice(0, 3)
      : CORE_MEDIA_PAGES.filter((page) =>
          ['Services', 'Bespoke Events', 'Contact Us'].includes(page.title),
        );

  return selectedPages.map((page) => ({
    title: page.title,
    description: page.description,
    href: page.href,
  }));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as ChatRequestBody | null;

    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    const previousInteractionId =
      typeof body?.previousInteractionId === 'string' ? body.previousInteractionId.trim() : '';

    if (!message) {
      return NextResponse.json(
        {
          error: 'Please enter a message.',
        },
        {
          status: 400,
        },
      );
    }

    if (message.length > 700) {
      return NextResponse.json(
        {
          error: 'Please keep your message below 700 characters.',
        },
        {
          status: 400,
        },
      );
    }

    if (previousInteractionId.length > 500) {
      return NextResponse.json(
        {
          error: 'Invalid conversation ID.',
        },
        {
          status: 400,
        },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // console.error('GEMINI_API_KEY is missing.');

      return NextResponse.json(
        {
          error:
            'The CORE Media Assistant is not configured. Please contact the website administrator.',
        },
        {
          status: 500,
        },
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const interaction = await ai.interactions.create({
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
      input: message,

      /*
       * System instructions must be supplied on every interaction,
       * including follow-up messages.
       */
      system_instruction: SYSTEM_INSTRUCTION,

      ...(previousInteractionId
        ? {
            previous_interaction_id: previousInteractionId,
          }
        : {}),
    });

    const reply =
      interaction.output_text?.trim() ||
      'Sorry, I could not answer that. Please contact the CORE Media team.';

    return NextResponse.json({
      reply,
      interactionId: interaction.id,
      suggestedLinks: getSuggestedLinks(message),
    });
  } catch (error) {
    // console.error('CORE Media bot error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown Gemini API error';

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? `Gemini API error: ${errorMessage}`
            : 'The assistant is temporarily unavailable. Please try again.',
      },
      {
        status: 500,
      },
    );
  }
}
