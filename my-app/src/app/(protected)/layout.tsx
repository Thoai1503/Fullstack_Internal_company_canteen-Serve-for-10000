// app/(protected)/layout.tsx
// Create this file for routes that need authentication

import { AuthInitializer } from "@/components/auth/AuthInitializer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthInitializer>{children}</AuthInitializer>;
}
