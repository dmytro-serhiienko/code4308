"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GsapScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo flies in from left
      gsap.from("[data-intro='logo']", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Menu button flies in from right
      gsap.from("[data-intro='menu']", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Hero image fades in
      gsap.from("[data-intro='hero-image']", {
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.6,
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
        const children = el.children;
        gsap.from(children, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
