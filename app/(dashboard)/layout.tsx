import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "../styles/dashboard.css"; // opcional se quiseres estilos globais por seção

export const metadata = {
  title: "Dashboard — AgencyPulse",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex flex-1 flex-col">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
