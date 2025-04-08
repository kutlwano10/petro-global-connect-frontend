import { Suspense } from "react";
import ManagerLayout from "@/components/manager/ManagerLayout";
export default function ManagerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <ManagerLayout>{children}</ManagerLayout>
    </Suspense>
  );
}