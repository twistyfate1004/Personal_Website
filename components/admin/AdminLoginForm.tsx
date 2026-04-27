"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [configured, setConfigured] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("/api/admin/auth", { cache: "no-store" });
      const payload = await response.json() as {
        authenticated: boolean;
        configured: boolean;
      };

      setConfigured(payload.configured);

      if (payload.authenticated) {
        router.replace(searchParams.get("next") || "/admin");
      }
    }

    checkSession();
  }, [router, searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = await response.json() as { error?: string };
        throw new Error(payload.error || "登录失败");
      }

      router.replace(searchParams.get("next") || "/admin");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "登录失败");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-border p-6">
      <div className="mb-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-muted">
          <Lock className="h-5 w-5 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">管理员登录</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          登录后可以维护个人主页内容。
        </p>
      </div>

      {!configured && (
        <div className="mb-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
          当前没有配置 `ADMIN_PASSWORD` 环境变量。部署公网前必须配置管理员密码。
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">管理员密码</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            autoComplete="current-password"
            disabled={!configured || isSubmitting}
          />
        </label>

        <button
          type="submit"
          disabled={!configured || isSubmitting || !password}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          登录
        </button>
      </form>
    </section>
  );
}
