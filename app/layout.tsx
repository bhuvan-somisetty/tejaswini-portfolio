import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejaswini Somisetty | Pharm.D Candidate & Clinical Pharmacy",
  description:
    "Portfolio of Tejaswini Somisetty — Final-Year Pharm.D Candidate specialising in Clinical Pharmacy, Healthcare Quality, Patient Safety, and Antibiotic Stewardship at Karnataka College of Pharmacy, Bengaluru.",
  keywords: [
    "Tejaswini Somisetty",
    "Clinical Pharmacy",
    "Pharm.D",
    "Healthcare Quality",
    "Patient Safety",
    "Clinical Research",
    "Pharmacovigilance",
    "Antibiotic Stewardship",
    "Karnataka College of Pharmacy",
  ],
  authors: [{ name: "Tejaswini Somisetty" }],
  creator: "Tejaswini Somisetty",
  openGraph: {
    type: "website",
    title: "Tejaswini Somisetty | Clinical Pharmacy Portfolio",
    description:
      "Final-Year Pharm.D Candidate specialising in clinical pharmacy, patient safety, and evidence-based medicine.",
    siteName: "Tejaswini Somisetty",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejaswini Somisetty | Clinical Pharmacy Portfolio",
    description:
      "Final-Year Pharm.D Candidate | Clinical Pharmacy | Healthcare Quality | Patient Safety",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#09090f" />
      </head>
      <body
        style={{
          backgroundColor: "#09090f",
          color: "#f1f5f9",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
