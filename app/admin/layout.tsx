"use client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-4 px-8 bg-white border-b">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <main>{children}</main>
    </div>
  );
}