import { Suspense } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  );
}