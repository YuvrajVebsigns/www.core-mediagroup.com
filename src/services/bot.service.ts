import { apiFetch } from '@/services/apiFetch';
import { buildWebsiteAuthHeaders, ensureWebsiteAuth } from '@/lib/website-auth';

type WebsiteBotPageResponse = {
  success: boolean;
  message?: string;
  data?: {
    slug?: string;
    title?: string;
    sections?: Array<{
      type?: string;
      data?: {
        faqs?: Array<{ question?: string; answer?: string }>;
      };
    }>;
    content?: {
      blocks?: Array<{
        type?: string;
        data?: {
          faqs?: Array<{ question?: string; answer?: string }>;
        };
      }>;
    };
    seo?: {
      ogImage?: string;
    };
  };
};

type QuestionItem = {
  id: string;
  question: string;
  answer: string;
};

function normalizeFaqItems(
  faqs: Array<{ question?: string; answer?: string }> | undefined,
): QuestionItem[] {
  if (!Array.isArray(faqs)) return [];
  return faqs
    .filter((faq) => typeof faq?.question === 'string' && faq.question.trim().length > 0)
    .map((faq, index) => ({
      id: `faq-${index}-${faq.question?.trim().slice(0, 20).replace(/\s+/g, '-')}`,
      question: faq.question!.trim(),
      answer: (faq.answer ?? '').trim(),
    }));
}

function extractFaqs(response: WebsiteBotPageResponse): QuestionItem[] {
  const page = response.data;
  if (!page) return [];

  const sectionFaqs = page.sections
    ?.flatMap((section) =>
      section?.type?.toString().toLowerCase().includes('faq')
        ? normalizeFaqItems(section.data?.faqs)
        : [],
    )
    .filter(Boolean) as QuestionItem[];

  if (sectionFaqs && sectionFaqs.length > 0) {
    return sectionFaqs;
  }

  const blockFaqs = page.content?.blocks
    ?.flatMap((block) =>
      block?.type?.toString().toLowerCase().includes('faq')
        ? normalizeFaqItems(block.data?.faqs)
        : [],
    )
    .filter(Boolean) as QuestionItem[];

  return blockFaqs || [];
}

export async function fetchChatbotFaqs(
  slug = 'chatbot',
  domain = 'coremediagroup.com',
): Promise<QuestionItem[]> {
  const auth = await ensureWebsiteAuth(domain);
  const headers = buildWebsiteAuthHeaders(auth);
  const endpoint = `/api/v1/website/pages/${encodeURIComponent(slug)}`;

  const response = await apiFetch<WebsiteBotPageResponse>(endpoint, {
    requireAuth: false,
    headers,
  });

  return extractFaqs(response);
}

export async function fetchChatbotImage(
  slug = 'chatbot',
  domain = 'coremediagroup.com',
): Promise<string> {
  const auth = await ensureWebsiteAuth(domain);
  const headers = buildWebsiteAuthHeaders(auth);
  const endpoint = `/api/v1/website/pages/${encodeURIComponent(slug)}`;

  const response = await apiFetch<WebsiteBotPageResponse>(endpoint, {
    requireAuth: false,
    headers,
  });

  return response.data?.seo?.ogImage || '/assets/logo/logo.png';
}
