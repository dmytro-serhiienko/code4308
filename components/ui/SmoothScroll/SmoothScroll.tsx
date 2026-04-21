// "use client";

// import { ReactLenis, useLenis } from "lenis/react";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import type { LenisRef } from "lenis/react";
// import { usePathname } from "next/navigation";

// gsap.registerPlugin(ScrollTrigger);

// function LenisGsapBridge() {
//   useLenis(() => {
//     ScrollTrigger.update();
//   });
//   return null;
// }

// export function SmoothScroll({ children }: { children: React.ReactNode }) {
//   const lenisRef = useRef<LenisRef>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     const stop = () => lenisRef.current?.lenis?.stop();
//     const start = () => lenisRef.current?.lenis?.start();
//     window.addEventListener("lenis:stop", stop);
//     window.addEventListener("lenis:start", start);
//     return () => {
//       window.removeEventListener("lenis:stop", stop);
//       window.removeEventListener("lenis:start", start);
//     };
//   }, []);

//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       const target = e.target as HTMLElement;
//       const link = target.closest("a");

//       if (link && link.hash && link.origin === window.location.origin) {
//         if (link.pathname !== window.location.pathname) {
//           return;
//         }

//         e.preventDefault();
//         lenisRef.current?.lenis?.scrollTo(link.hash, {
//           lerp: 0.1,
//           duration: 1.5,
//         });
//       }
//     }

//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, []);

//   useEffect(() => {
//     const lenis = lenisRef.current?.lenis;
//     const introState = document.documentElement.dataset.intro;

//     if (introState !== "done") {
//       document.body.style.overflow = "hidden";
//       lenis?.stop();
//       return;
//     }

//     // Ensure scrolling is always unlocked after route transitions.
//     document.body.style.overflow = "auto";
//     lenis?.start();

//     requestAnimationFrame(() => {
//       lenis?.resize();

//       if (window.location.hash) {
//         lenis?.scrollTo(window.location.hash, { duration: 1 });
//       } else {
//         lenis?.scrollTo(0, { immediate: true });
//       }

//       ScrollTrigger.refresh();
//     });
//   }, [pathname]);

//   return (
//     <ReactLenis
//       root
//       ref={lenisRef}
//       options={{ duration: 1.2, smoothWheel: true }}
//     >
//       <LenisGsapBridge />
//       {children}
//     </ReactLenis>
//   );
// }

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

  // Визначаємо
  const isPodcastsPage = pathname === "/podcasts";

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    // ЛОГІКА ВИМКНЕННЯ
    if (isPodcastsPage) {
      // Зупиняємо плавний скрол
      lenis?.stop();
      document.body.style.overflow = "auto";
      return;
    }

    // ЛОГІКА ДЛЯ ІНТРО
    const introState = document.documentElement.dataset.intro;

    if (introState !== "done") {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      return;
    }

    // У всіх інших випадках вмикаємо Lenis
    document.body.style.overflow = "auto";
    lenis?.start();

    requestAnimationFrame(() => {
      lenis?.resize();

      // Скролимо до якоря
      if (window.location.hash) {
        lenis?.scrollTo(window.location.hash, { duration: 1 });
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
        // Вимикаємо на подкастах
        smoothWheel: !isPodcastsPage,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
