import { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "管理员登录",
};

export default function AdminLoginPage() {
  return (
    <Container className="py-12">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </Container>
  );
}
