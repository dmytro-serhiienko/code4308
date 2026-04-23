"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const cleanup = () => {
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped",
      );
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";

      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.refresh(true);
    };

    if (isMobile || isPodcastsPage) {
      cleanup();
      const timer = setTimeout(() => {
        ScrollTrigger.refresh(true);
        window.dispatchEvent(new Event("resize"));
      }, 500);
      return () => clearTimeout(timer);
    } else {
      const lenis = lenisRef.current?.lenis;
      const introState = document.documentElement.dataset.intro;

      if (introState === "done") {
        lenis?.start();
        setTimeout(() => ScrollTrigger.refresh(), 200);
      } else {
        lenis?.stop();
        const handleIntro = () => {
          lenis?.start();
          setTimeout(() => ScrollTrigger.refresh(), 200);
        };
        window.addEventListener("intro:complete", handleIntro);
        return () => window.removeEventListener("intro:complete", handleIntro);
      }
    }
  }, [pathname, isMobile, isPodcastsPage]);

  // Демонтуємо Lenis для мобілок та подкастів
  if (isMobile || isPodcastsPage) {
    return <div id="native-scroll-root">{children}</div>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
