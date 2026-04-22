// Без подкастів
"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
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
  const isPodcastsPage = pathname === "/podcasts";

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const startScrolling = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });

      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      lenis.start();

      setTimeout(() => {
        ScrollTrigger.refresh();
        lenis.resize();
      }, 150);
    };

    if (isPodcastsPage) {
      lenis.stop();
      document.body.style.overflow = "auto";
      return;
    }

    const introState = document.documentElement.dataset.intro;

    if (introState !== "done") {
      lenis.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleIntroComplete = () => {
        startScrolling();
      };

      window.addEventListener("intro:complete", handleIntroComplete);
      return () =>
        window.removeEventListener("intro:complete", handleIntroComplete);
    } else {
      startScrolling();
    }

    requestAnimationFrame(() => {
      lenis.resize();
      if (window.location.hash) {
        lenis.scrollTo(window.location.hash, { duration: 1.2 });
      }
      ScrollTrigger.refresh();
    });
  }, [pathname, isPodcastsPage]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        smoothWheel: !isPodcastsPage,
        syncTouch: true, // Критично для Safari на iPhone
        wheelMultiplier: 1,
        lerp: 0.1,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
