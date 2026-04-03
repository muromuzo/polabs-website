"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { guides, guideTags } from "./guides-data";
import styles from "./page.module.css";

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("전체");

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesSearch =
        !searchQuery ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesTag =
        activeTag === "전체" || guide.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeTag]);

  const featuredGuides = guides.filter((g) => g.featured).slice(0, 3);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <img src="/images/polabs-logo.png" alt="POLABS" />
        </Link>
        <nav className={styles.nav}>
          <Link href="/">홈</Link>
          <Link href="/guides" className={styles.active}>가이드</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.badge}>📚 무료 가이드</span>
        <h1 className={styles.heroTitle}>병원 경영 가이드</h1>
        <p className={styles.heroDesc}>
          개원부터 마케팅, 매출 성장까지.
          <br />
          피오랩스의 전문 컨설턴트가 작성한 실전 가이드를 무료로 확인하세요.
        </p>
      </section>

      {/* Search & Filter */}
      <section className={styles.filterSection}>
        <input
          type="text"
          placeholder="가이드 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.tags}>
          {guideTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagBtn} ${activeTag === tag ? styles.tagActive : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Featured TOP 3 */}
      {!searchQuery && activeTag === "전체" && (
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>🔥 인기 가이드 TOP 3</h2>
          <div className={styles.featuredGrid}>
            {featuredGuides.map((guide, i) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className={styles.featuredCard}
              >
                <span className={styles.featuredRank}>#{i + 1}</span>
                <span className={styles.featuredIcon}>{guide.icon}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <div className={styles.cardMeta}>
                  <span>📖 {guide.readTime}분</span>
                  <span>{guide.updatedAt}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Guides Grid */}
      <section className={styles.guidesSection}>
        <h2 className={styles.sectionTitle}>
          {activeTag === "전체" ? "전체 가이드" : activeTag}
          <span className={styles.count}>{filteredGuides.length}개</span>
        </h2>
        <div className={styles.guidesGrid}>
          {filteredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={styles.guideCard}
            >
              <div className={styles.guideCardHeader}>
                <span className={styles.guideIcon}>{guide.icon}</span>
                <span className={styles.readTime}>📖 {guide.readTime}분</span>
              </div>
              <h3 className={styles.guideTitle}>{guide.title}</h3>
              <p className={styles.guideDesc}>{guide.description}</p>
              <div className={styles.guideTags}>
                {guide.tags.map((tag) => (
                  <span key={tag} className={styles.guideTag}>
                    #{tag}
                  </span>
                ))}
              </div>
              <div className={styles.guideDate}>{guide.updatedAt}</div>
            </Link>
          ))}
        </div>
        {filteredGuides.length === 0 && (
          <div className={styles.emptyState}>
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>전문 컨설팅이 필요하신가요?</h2>
        <p>피오랩스의 전문 컨설턴트가 병원 매출 성장을 설계합니다.</p>
        <Link href="/#contact" className={styles.ctaBtn}>
          무료 상담 신청 →
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 POLABS. All rights reserved.</p>
      </footer>
    </div>
  );
}
