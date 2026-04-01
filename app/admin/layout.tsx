import type { Metadata } from "next";
import { AdminCommandPaletteWrapper } from "app/admin/components/admin-command-wrapper";

export const metadata: Metadata = {
  title: "Admin Portal",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      {children}
      <AdminCommandPaletteWrapper />
    </div>
  );
}
