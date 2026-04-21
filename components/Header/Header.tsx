"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { IoClose } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { CgMenuMotion } from "react-icons/cg";

import css from "./Header.module.css";

import { navLinks } from "./headerLinks";

export function Header() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenu((prev) => !prev);
  const closeMenu = () => setMenu(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  return (
    <header className={`${css.header} ${scrolled ? css.scrolled : ""}`}>
      <div className={css.headerContent}>
        <div className={css.logo} data-intro="logo">
          <Link href="/" className={css.logoLink} onClick={closeMenu}>
            {/* <span className={css.logoText}>Code4308</span>
            <span className={css.logoExtraText}>Podcasts</span> */}
            <Image
              className={css.logoImage}
              src="/image/logo/logo.png"
              alt="Logo"
              width={200}
              height={50}
            />
          </Link>
        </div>

        <div className={css.menuTrigger} data-intro="menu">
          <button
            type="button"
            className={css.menuButton}
            onClick={toggleMenu}
            aria-expanded={menu}
            aria-label={menu ? "Закрити меню" : "Відкрити меню"}
          >
            <span
              className={`${css.iconWrap} ${menu ? css.iconOpen : ""}`}
              aria-hidden="true"
            >
              <CgMenuMotion className={`${css.iconBase} ${css.iconBurger}`} />
              <IoClose className={`${css.iconBase} ${css.iconClose}`} />
            </span>
          </button>
        </div>

        {/* active */}
        <nav className={`${css.navOverlay} ${menu ? css.active : ""}`}>
          <ul className={css.navList}>
            {navLinks.map((link) => (
              <li key={link.href} className={css.navItem}>
                <Link
                  href={link.href}
                  className={css.navLink}
                  onClick={closeMenu}
                >
                  <span className={css.navLabel}>{link.label}</span>
                  <MdArrowOutward className={css.navArrow} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
//
