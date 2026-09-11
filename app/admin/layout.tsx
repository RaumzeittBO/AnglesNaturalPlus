import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Administración | ANGLES NATURAL",
  description: "Panel de control y gestión integral para Angles Natural y Angles Circular.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d140e] text-[#f4f7f4] flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
