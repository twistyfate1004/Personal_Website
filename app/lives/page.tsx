"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { MediaGallery } from "@/components/lives/MediaGallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { LifePost, LivesData } from "@/lib/data";

export default function LivesPage() {
  const { language, t } = useLanguage();
  const [livesData, setLivesData] = useState<LivesData>({ posts: [] });

  useEffect(() => {
    async function fetchLives() {
      try {
        const res = await fetch(`/api/data/lives?lang=${language}`);
        const data = await res.json() as LivesData;
        setLivesData(data);
      } catch (error) {
        console.error("Failed to load lives:", error);
      }
    }

    fetchLives();
  }, [language]);

  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        {t.lives.title}
      </h1>

      <p className="text-lg text-muted-foreground mb-12">
        {t.lives.description}
      </p>

      {/* Render all life posts */}
      {livesData.posts.length > 0 ? (
        <div className="space-y-8">
          {livesData.posts.map((post: LifePost) => (
            <article
              key={post.id}
              className="p-6 rounded-lg border border-border hover:border-accent transition-colors bg-muted/30"
            >
              {/* Header: Title and Date */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold flex-1">{post.title}</h2>
                <time className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  {post.date}
                </time>
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {post.content}
              </p>

              {/* Media Grid */}
              {post.mediaList && post.mediaList.length > 0 && (
                <MediaGallery mediaList={post.mediaList} title={post.title} />
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t.lives.noData}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.lives.addData}
          </p>
        </div>
      )}
    </Container>
  );
}
