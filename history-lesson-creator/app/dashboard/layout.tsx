"use client";

import { ProgressProvider } from "@/lib/contexts/ProgressContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
