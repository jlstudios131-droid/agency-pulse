export const metadata = {
  title: "AgencyPulse",
  description: "SaaS para agências",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
