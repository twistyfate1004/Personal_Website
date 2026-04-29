import { Container } from "@/components/layout/Container";

export default function LinksPage() {
  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        Links
      </h1>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-base text-muted-foreground sm:text-lg">
          Links coming soon...
        </p>
        <p className="text-muted-foreground">
          This page will contain my recommended resources and friendly links.
        </p>
      </section>
    </Container>
  );
}
