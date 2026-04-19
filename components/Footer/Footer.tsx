import Link from "next/link";
import css from "./Footer.module.css";
import Image from "next/image";

import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane, FaYoutube, FaSpotify, FaApple } from "react-icons/fa";

const socialLinks = [
  {
    id: 1,
    href: "https://www.instagram.com/hub.4308/",
    icon: <AiFillInstagram />,
  },
  {
    id: 2,
    href: "https://t.me/recruit4308",
    icon: <FaTelegramPlane />,
  },
  {
    id: 3,
    href: "https://www.youtube.com/@production.4308",
    icon: <FaYoutube />,
  },
  {
    id: 4,
    href: "https://open.spotify.com/show/2q0TuBjroDZeBT7ucSmrZI",
    icon: <FaSpotify />,
  },
  {
    id: 5,
    href: "https://podcasts.apple.com/tr/podcast/code-4308/id1892027093",
    icon: <FaApple />,
  },
];

export function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.decor1}>4308</div>
      <div className={css.decor2}>4308</div>

      <div className={css.container}>
        {/* Лого  */}
        <div className={css.column} data-anim="fade-up">
          <Link href="/" className={css.logoLink}>
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
          <p className={css.description}>
            Платформа для тих, хто слухає, думає та діє. Приєднуйся до
            спільноти.
          </p>
        </div>

        {/* Навігація */}
        <div className={css.column} data-anim="fade-up">
          <h3 className={css.title}>Навігація</h3>
          <nav className={css.nav}>
            <Link href="/">Головна</Link>
            <Link href="/#about">Про нас</Link>
            <Link href="/podcasts">Подкасти</Link>
            <Link href="https://4308.store/collections/4308" target="_blank">
              Магазин
            </Link>
            <Link href="/contacts">Контакти</Link>
          </nav>
        </div>

        {/* Соцмережі */}
        <div className={css.column} data-anim="fade-up">
          <h3 className={css.title}>Ми в мережах</h3>
          <div className={css.socials}>
            {socialLinks &&
              socialLinks.map((el) => {
                return (
                  <Link
                    key={el.id}
                    href={el.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css.socialLink}
                  >
                    <div className={css.iconWrapper}>{el.icon}</div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      <div className={css.bottom}>
        <p className={css.copy}>© 2026 CODE 4308. All rights reserved.</p>
        <Link href="/privacy" className={css.footerLink}>
          Політика конфіденційності
        </Link>
      </div>
    </footer>
  );
}
