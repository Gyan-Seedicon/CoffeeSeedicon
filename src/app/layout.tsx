import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Seedicon Coffee Exports | Premium Indian Coffee Exporter",
  description: "Seedicon Coffee Exports connects global markets with premium Indian coffee beans. We ethically source top-tier Arabica and Robusta from Coorg, Chikmagalur, and Araku Valley.",
  keywords: "coffee export, Indian coffee exporter, Arabica beans, Robusta beans, green coffee, Coorg coffee, Chikmagalur coffee, B2B coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-warm-cream text-text-strong antialiased">
        {children}
      </body>
    </html>
  );
}
