import "./../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AgencyPulse",
  description: "Dashboard profissional para agências"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
