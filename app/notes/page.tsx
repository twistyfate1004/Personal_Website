import { Container } from "@/components/layout/Container";

export default function NotesPage() {
  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        Notes
      </h1>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground">
          Notes coming soon...
        </p>
        <p className="text-muted-foreground">
          This page will contain my random thoughts, quick notes, and snippets.
        </p>
      </section>
    </Container>
  );
}