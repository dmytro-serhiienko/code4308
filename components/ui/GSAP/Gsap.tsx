"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function GsapScrollAnimations() {
  const pathname = usePathname();
  const [introComplete, setIntroComplete] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.intro === "done",
  );

  useEffect(() => {
    if (introComplete) {
      return;
    }

    const handleIntroComplete = () => setIntroComplete(true);
    window.addEventListener("intro:complete", handleIntroComplete);

    return () => {
      window.removeEventListener("intro:complete", handleIntroComplete);
    };
  }, [introComplete]);

  useEffect(() => {
    if (!introComplete) {
      return;
    }

    let frameId = 0;

    const ctx = gsap.context(() => {
      const animateIfFound = (selector: string, vars: gsap.TweenVars): void => {
        const targets = gsap.utils.toArray(selector);
        if (targets.length === 0) {
          return;
        }
        gsap.from(targets, vars);
      };

      // Intro targets are route-specific, so animate only when present.
      animateIfFound("[data-intro='logo']", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      animateIfFound("[data-intro='menu']", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      animateIfFound("[data-intro='hero-image']", {
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.6,
      });

      animateIfFound("[data-intro='hero-decor']", {
        x: -140,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });

      // Fade up
      gsap.utils.toArray<HTMLElement>("[data-anim='fade-up']").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Fade left
      gsap.utils
        .toArray<HTMLElement>("[data-anim='fade-left']")
        .forEach((el) => {
          gsap.from(el, {
            x: -80,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

      // Fade right
      gsap.utils
        .toArray<HTMLElement>("[data-anim='fade-right']")
        .forEach((el) => {
          gsap.from(el, {
            x: 80,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

      // Scale in
      gsap.utils
        .toArray<HTMLElement>("[data-anim='scale-in']")
        .forEach((el) => {
          gsap.from(el, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

      // Stagger children
      gsap.utils.toArray<HTMLElement>("[data-anim='stagger']").forEach((el) => {
        const children = Array.from(el.children);
        if (children.length === 0) {
          return;
        }
        gsap.from(children, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    frameId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frameId);
      ctx.revert();
    };
  }, [introComplete, pathname]);

  return null;
}
