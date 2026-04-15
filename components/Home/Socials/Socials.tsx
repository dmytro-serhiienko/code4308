import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane, FaYoutube, FaSpotify } from "react-icons/fa";
import css from "./Socials.module.css";

const socialLinks = [
  {
    id: 1,
    href: "https://www.instagram.com/hub.4308/",
    icon: <AiFillInstagram />,
    label: "Instagram",
  },
  {
    id: 2,
    href: "https://t.me/recruit4308",
    icon: <FaTelegramPlane />,
    label: "Telegram",
  },
  {
    id: 3,
    href: "https://www.youtube.com/@production.4308",
    icon: <FaYoutube />,
    label: "YouTube",
  },
  {
    id: 4,
    href: "https://open.spotify.com/...", // онови реальне посилання
    icon: <FaSpotify />,
    label: "Spotify",
  },
];

export function Socials() {
  return (
    <section className={css.socials}>
      <div className={css.container}>
        <div className={css.textBlock}>
          <h2 className={css.title}>
            Підписуйся <br /> Слідкуй <br /> Слухай
          </h2>
        </div>

        <div className={css.linksGrid}>
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
              aria-label={link.label}
            >
              <div className={css.iconWrapper}>{link.icon}</div>
              <span className={css.linkText}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
