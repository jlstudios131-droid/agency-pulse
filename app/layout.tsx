import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AgencyPulse",
  description: "Professional SaaS platform for agencies",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
