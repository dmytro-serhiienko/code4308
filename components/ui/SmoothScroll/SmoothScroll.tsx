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
    const forceReset = () => {
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped",
      );

      document.documentElement.style.overflow = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";

      ScrollTrigger.getAll().forEach((t) => t.kill());

      gsap.set("[data-anim]", {
        opacity: 1,
        y: 0,
        visibility: "visible",
        clearProps: "all",
      });

      ScrollTrigger.refresh();
    };

    if (isMobile || isPodcastsPage) {
      forceReset();
      // Страховка на деплої (через 500мс і 1с)
      const t1 = setTimeout(forceReset, 500);
      const t2 = setTimeout(forceReset, 1000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [pathname, isMobile, isPodcastsPage]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis || isMobile || isPodcastsPage) return;

    const introState = document.documentElement.dataset.intro;
    if (introState === "done") {
      lenis.start();
      setTimeout(() => ScrollTrigger.refresh(), 200);
    } else {
      lenis.stop();
      const handleIntro = () => {
        lenis.start();
        setTimeout(() => {
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event("resize"));
        }, 200);
      };
      window.addEventListener("intro:complete", handleIntro);
      return () => window.removeEventListener("intro:complete", handleIntro);
    }
  }, [pathname, isMobile, isPodcastsPage]);

  if (isMobile || isPodcastsPage) {
    return (
      <main style={{ position: "relative", width: "100%", display: "block" }}>
        {children}
      </main>
    );
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
