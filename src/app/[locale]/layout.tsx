import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";

const helveticaNeueArabic = localFont({
  src: "./fonts/helveticaneueltarabicroman1.ttf",
  variable: "--font-helvetica-arabic",
  weight: "400 700 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAYADEEN PLUS",
  description: "MAYADEEN by create next app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${helveticaNeueArabic.variable}`}>
        <NextIntlClientProvider>
          <Header />
          <main className="min-h-[calc(100vh-133px)]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
