import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import FloatingCTA from "@/components/FloatingCTA";
import ContactFormModal from '@/components/ContactFormModal';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MPP BI — Ultra-Fast Analytics. Built Inside Your Data.",
  description:
    "MPP BI is a 2-tier business intelligence platform that runs business logic inside your database using PL/pgSQL stored procedures. 2x–12x faster than Tableau and Power BI. No ETL, no data extraction, no separate BI server. Cloud and on-premises. Starting at $10/seat/month.",
  keywords: [
    "BI platform",
    "business intelligence",
    "database analytics",
    "PostgreSQL BI",
    "stored procedures analytics",
    "data-centric BI",
    "on-premises BI",
    "MPP BI",
    "MPP Insights",
    "PL/pgSQL analytics",
    "no ETL BI",
    "2-tier architecture",
  ],
  authors: [{ name: "MPP Insights" }],
  creator: "MPP Insights",
  publisher: "MPP Insights",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mppbi.com",
    siteName: "MPP BI",
    title: "MPP BI — Ultra-Fast Analytics. Built Inside Your Data.",
    description:
      "2-tier BI platform that runs analytics inside your database. No ETL. No separate BI server. 2x–12x faster. Starting at $10/seat/month.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MPP BI — Ultra-Fast Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MPP BI — Ultra-Fast Analytics. Built Inside Your Data.",
    description:
      "2-tier BI platform. Business logic inside your database. 2x–12x faster than traditional BI. $10/seat/month.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0E1A] text-[#F0F4FF]">
        <Navigation />
        <main className="flex-1">{children}</main>
        <FloatingCTA />
        <ContactFormModal />
      </body>
    </html>
  );
}
