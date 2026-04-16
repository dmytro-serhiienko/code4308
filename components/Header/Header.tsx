"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";

import css from "./Header.module.css";
import { MdArrowOutward } from "react-icons/md";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/#about", label: "Про нас" },
  { href: "/podcasts", label: "Подкасти" },
  { href: "https://4308.store/collections/4308", label: "Магазин" },
  { href: "/contacts", label: "Контакти" },
];

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
          <Link href="/" className={css.logoLink}>
            <span className={css.logoText}>Code4308</span>
            <span className={css.logoExtraText}>Podcasts</span>
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
              <HiMenuAlt3 className={`${css.iconBase} ${css.iconBurger}`} />
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
