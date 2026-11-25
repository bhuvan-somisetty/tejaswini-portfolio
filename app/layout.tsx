import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://tejaswini-portfolio-blond.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    "Pharm.D Candidate",
    "Medication Safety",
    "Drug Information Services",
    "Evidence-Based Medicine",
    "Quality Improvement",
    "Clinical Audit",
    "Healthcare Innovation",
    "Research Enthusiast",
    "Future Clinical Pharmacist",
    "WHO AWaRe",
  ],
  authors: [{ name: "Tejaswini Somisetty" }],
  creator: "Tejaswini Somisetty",
  openGraph: {
    type: "website",
    url: SITE_URL,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0809",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tejaswini Somisetty",
  jobTitle: "Pharm.D Candidate",
  url: SITE_URL,
  email: "mailto:tejaswinisomisetty22@gmail.com",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Karnataka College of Pharmacy" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  knowsLanguage: ["Telugu", "English", "Kannada", "Hindi"],
  knowsAbout: [
    "Clinical Pharmacy",
    "Healthcare Quality",
    "Patient Safety",
    "Clinical Research",
    "Pharmacovigilance",
    "Medication Safety",
    "Antibiotic Stewardship",
    "Evidence-Based Medicine",
  ],
  sameAs: ["https://www.linkedin.com/in/tejaswini-somisetty-1a7776340"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
