import type { Metadata } from "next";

interface ArticleLayoutProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  let description =
    "Panduan wisata, informasi kuliner, dan tips transit penerbangan praktis di sekitar Bandara Internasional Pattimura Ambon.";

  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://103.143.12.212/api/v1";
    const res = await fetch(`${apiUrl}/articles/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const article = json?.data || json;
      if (article?.title) {
        title = article.title;
      }
      if (article?.summary) {
        description = article.summary;
      }
    }
  } catch {
    // Fallback ke formatted slug jika API offline saat build
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: `${title} | Penginapan Annisa`,
      description,
      url: `https://www.penginapanannisa.com/articles/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Penginapan Annisa`,
      description,
    },
  };
}

export default function ArticleSlugLayout({ children }: ArticleLayoutProps) {
  return children;
}
