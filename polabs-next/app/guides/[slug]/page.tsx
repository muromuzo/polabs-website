import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "../guides-data";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.tags.join(", ") + ", 병원 컨설팅, 피오랩스, POLABS",
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `https://polabs.co.kr/guides/${guide.slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://polabs.co.kr/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = guides
    .filter(
      (g) =>
        g.slug !== guide.slug &&
        g.tags.some((tag) => guide.tags.includes(tag))
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: "POLABS 피오랩스",
      url: "https://polabs.co.kr",
    },
    publisher: {
      "@type": "Organization",
      name: "POLABS 피오랩스",
      logo: {
        "@type": "ImageObject",
        url: "https://polabs.co.kr/images/polabs-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://polabs.co.kr/guides/${guide.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <img src="/images/polabs-logo.png" alt="POLABS" />
          </Link>
          <nav className={styles.nav}>
            <Link href="/">홈</Link>
            <Link href="/guides">가이드</Link>
          </nav>
        </header>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">홈</Link>
          <span>/</span>
          <Link href="/guides">가이드</Link>
          <span>/</span>
          <span className={styles.current}>{guide.title}</span>
        </nav>

        {/* Article */}
        <article className={styles.article}>
          <div className={styles.articleHeader}>
            <span className={styles.icon}>{guide.icon}</span>
            <h1 className={styles.title}>{guide.title}</h1>
            <p className={styles.description}>{guide.description}</p>
            <div className={styles.meta}>
              <span>📖 {guide.readTime}분 읽기</span>
              <span>📅 {guide.updatedAt}</span>
            </div>
            <div className={styles.articleTags}>
              {guide.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/guides?tag=${encodeURIComponent(tag)}`}
                  className={styles.articleTag}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <div className={styles.toc}>
            <h3>📋 목차</h3>
            <ul>
              {guide.sections.map((section, i) => (
                <li key={i}>
                  <a href={`#section-${i}`}>{section.heading}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className={styles.content}>
            {guide.sections.map((section, i) => (
              <section key={i} id={`section-${i}`} className={styles.section}>
                <h2>{section.heading}</h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>
        </article>

        {/* CTA */}
        <div className={styles.ctaBox}>
          <h3>💡 전문 컨설팅이 필요하신가요?</h3>
          <p>
            피오랩스는 착수금 없이, 성과로만 수수료를 받습니다.
            <br />
            90일 무위험 보장 특약으로 안심하고 시작하세요.
          </p>
          <Link href="/#contact" className={styles.ctaBtn}>
            무료 상담 신청 →
          </Link>
        </div>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className={styles.related}>
            <h3>📚 관련 가이드</h3>
            <div className={styles.relatedGrid}>
              {relatedGuides.map((rg) => (
                <Link
                  key={rg.slug}
                  href={`/guides/${rg.slug}`}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedIcon}>{rg.icon}</span>
                  <div>
                    <h4>{rg.title}</h4>
                    <p>{rg.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2024 POLABS. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
