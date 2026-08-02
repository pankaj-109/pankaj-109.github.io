import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleField from "@/components/fx/ParticleField";
import RobotCursor from "@/components/fx/RobotCursor";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Pankaj Kumar | Full-Stack & AI/ML Engineer",
    template: "%s | Pankaj Kumar",
  },
  description:
    "Full-Stack & AI/ML Engineer portfolio — P.A.N.K.U. Voice Agent, AI Career Buddy, automated Gate Pass System, and more.",
  keywords: [
    "Pankaj Kumar",
    "Full-Stack Engineer",
    "AI/ML Engineer",
    "Next.js",
    "React",
    "Voice Agent",
    "Computer Vision",
    "Portfolio",
  ],
  authors: [{ name: "Pankaj Kumar" }],
  openGraph: {
    title: "Pankaj Kumar | Full-Stack & AI/ML Engineer",
    description:
      "Interactive terminal portfolio of a Full-Stack & AI/ML engineer.",
    type: "website",
  },
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || "dark";
    if (theme === "light") document.documentElement.classList.add("light");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-matrix fixed inset-0 z-0" aria-hidden="true" />
        <ParticleField />
        <RobotCursor />
        <Navbar />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
