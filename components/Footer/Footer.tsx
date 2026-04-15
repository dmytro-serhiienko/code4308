import Link from "next/link";
import { FaInstagram, FaTelegram, FaYoutube, FaSpotify } from "react-icons/fa6";
import css from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        {/* Лого  */}
        <div className={css.column} data-anim="fade-up">
          <Link href="/" className={css.logoLink}>
            <span className={css.logoText}>Code4308</span>
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
            <Link href="#hero">Головна</Link>
            <Link href="#about">Про нас</Link>
            <Link href="/podcasts">Подкасти</Link>
            <Link href="https://4308.store/collections/4308" target="_blank">
              Магазин
            </Link>
            <Link href="#contacts">Контакти</Link>
          </nav>
        </div>

        {/* Соцмережі */}
        <div className={css.column} data-anim="fade-up">
          <h3 className={css.title}>Ми в мережах</h3>
          <div className={css.socials}>
            <Link href="https://www.instagram.com/hub.4308/" target="_blank">
              <FaInstagram />
            </Link>
            <Link href="https://t.me/recruit4308" target="_blank">
              <FaTelegram />
            </Link>
            <Link
              href="https://www.youtube.com/@production.4308"
              target="_blank"
            >
              <FaYoutube />
            </Link>
            <Link
              href="https://open.spotify.com/show/2q0TuBjroDZeBT7ucSmrZI"
              target="_blank"
            >
              <FaSpotify />
            </Link>
          </div>
        </div>
      </div>

      <div className={css.bottom}>
        <p className={css.copy}>© 2026 CODE 4308. All rights reserved.</p>
      </div>
    </footer>
  );
}
