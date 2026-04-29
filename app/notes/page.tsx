import { Container } from "@/components/layout/Container";

export default function NotesPage() {
  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        Notes
      </h1>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-base text-muted-foreground sm:text-lg">
          Notes coming soon...
        </p>
        <p className="text-muted-foreground">
          This page will contain my random thoughts, quick notes, and snippets.
        </p>
      </section>
    </Container>
  );
}
