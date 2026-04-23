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
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";

      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.refresh();
    };

    if (isMobile || isPodcastsPage) {
      cleanup();
    } else {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [pathname, isMobile, isPodcastsPage]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis || isMobile || isPodcastsPage) return;

    const introState = document.documentElement.dataset.intro;

    if (introState !== "done") {
      lenis.stop();

      const handleIntroComplete = () => {
        lenis.start();
        setTimeout(() => {
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event("resize"));
        }, 100);
      };

      window.addEventListener("intro:complete", handleIntroComplete);
      return () =>
        window.removeEventListener("intro:complete", handleIntroComplete);
    } else {
      lenis.start();
      ScrollTrigger.refresh();
    }
  }, [pathname, isMobile, isPodcastsPage]);

  if (isMobile || isPodcastsPage) {
    return <>{children}</>;
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
