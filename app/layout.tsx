import type { Metadata } from "next";
import { Tektur } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll/SmoothScroll";
import ScrollTop from "@/components/ui/ScrollToTop/ScrollTop";
import { GsapScrollAnimations } from "@/components/ui/GSAP/Gsap";
import Intro from "@/components/ui/Intro/Intro";

const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CODE4308",
  description: "PODCAST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ua"
      className={`${tektur.variable} suppressHydrationWarning h-full antialiased`}
    >
      <link rel="shortcut icon" href="/fav.png" type="image/x-icon" />
      <body className="min-h-full flex flex-col">
        <Intro />
        <SmoothScroll>
          <GsapScrollAnimations />
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
