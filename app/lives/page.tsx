"use client";

import { Container } from "@/components/layout/Container";
import { MediaGallery } from "@/components/lives/MediaGallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { LifePost, LivesData } from "@/lib/data";
import { useDataResource } from "@/hooks/useDataResource";

export default function LivesPage() {
  const { language, t } = useLanguage();
  const livesData = useDataResource<LivesData>("lives", language, { posts: [] });

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        {t.lives.title}
      </h1>

      <p className="mb-10 text-base text-muted-foreground sm:mb-12 sm:text-lg">
        {t.lives.description}
      </p>

      {/* Render all life posts */}
      {livesData.posts.length > 0 ? (
        <div className="space-y-8">
          {livesData.posts.map((post: LifePost) => (
            <article
              key={post.id}
              className="min-w-0 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:border-accent sm:p-6"
            >
              {/* Header: Title and Date */}
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="text-xl font-bold flex-1">{post.title}</h2>
                <time className="text-sm text-muted-foreground sm:ml-4 sm:whitespace-nowrap">
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
