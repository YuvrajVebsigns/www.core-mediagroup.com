import type { Metadata } from 'next';
import BlogDetailsClient from './BlogDetailsClient';
import { fetchWebsiteBlogForMetadata } from '@/services/blog-metadata.service';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://coremediagroup.com').replace(
  /\/$/,
  '',
);
const fallbackImage = '/assets/blogs/blog-1.webp';

function getAbsoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonicalUrl = getAbsoluteUrl(`/blog/${encodeURIComponent(slug)}`);

  try {
    const blog = await fetchWebsiteBlogForMetadata(slug);
    const title = blog?.seo?.metaTitle || blog?.title || 'CORE Media Blog';
    const description =
      blog?.excerpt || blog?.seo?.metaDescription || 'Insights and perspectives from CORE Media.';
    const imagePath =
      blog?.seo?.ogImage?.original ||
      blog?.seo?.ogImage?.large ||
      blog?.featureImage?.original ||
      blog?.featureImage?.large ||
      fallbackImage;
    const imageUrl = getAbsoluteUrl(imagePath);

    return {
      metadataBase: new URL(`${siteUrl}/`),
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: 'article',
        url: canonicalUrl,
        title,
        description,
        ...(blog?.publishedAt ? { publishedTime: blog.publishedAt } : {}),
        images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      metadataBase: new URL(`${siteUrl}/`),
      title: 'CORE Media Blog',
      description: 'Insights and perspectives from CORE Media.',
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: 'article',
        url: canonicalUrl,
        title: 'CORE Media Blog',
        description: 'Insights and perspectives from CORE Media.',
        images: [getAbsoluteUrl(fallbackImage)],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'CORE Media Blog',
        description: 'Insights and perspectives from CORE Media.',
        images: [getAbsoluteUrl(fallbackImage)],
      },
    };
  }
}

export default function BlogDetailsPage() {
  return <BlogDetailsClient />;
}
