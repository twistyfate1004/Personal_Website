import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "内容管理",
};

export default function AdminPage() {
  return (
    <Container className="py-8">
      <AdminContentManager />
    </Container>
  );
}
