import "./globals.css";

export const metadata = {
  title: "AI IT Services Contract Tracker",
  description: "AI-enabled outsourced contract tracking database with automated prepopulation and interactive analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
