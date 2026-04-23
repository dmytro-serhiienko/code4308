"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

function LenisGsapBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const isPodcastsPage = pathname === "/podcasts";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    // ЛОГІКА мобілка або Подкасти
    if (isMobile || isPodcastsPage) {
      if (lenis) {
        lenis.stop();
      }
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.height = "auto";
      return;
    }

    // ЛОГІКА Тільки десктоп і не подкасти
    const startScrolling = () => {
      const introState = document.documentElement.dataset.intro;

      if (introState === "done") {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
        lenis?.start();

        setTimeout(() => {
          ScrollTrigger.refresh();
          lenis?.resize();
        }, 150);
      } else {
        lenis?.stop();
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }
    };

    const handleIntroComplete = () => {
      document.documentElement.dataset.intro = "done";
      startScrolling();
    };

    window.addEventListener("intro:complete", handleIntroComplete);
    startScrolling();

    return () => {
      window.removeEventListener("intro:complete", handleIntroComplete);
    };
  }, [pathname, isPodcastsPage, isMobile]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={!isMobile && !isPodcastsPage}
      options={{
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
