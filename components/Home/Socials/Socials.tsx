import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane, FaYoutube, FaSpotify, FaApple } from "react-icons/fa";
import css from "./Socials.module.css";
import Image from "next/image";
import Link from "next/link";

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
    href: "https://open.spotify.com/show/2q0TuBjroDZeBT7ucSmrZI",
    icon: <FaSpotify />,
    label: "Spotify",
  },
  {
    id: 5,
    href: "https://podcasts.apple.com/tr/podcast/code-4308/id1892027093",
    icon: <FaApple />,
    label: "Apple Podcast",
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
          {}
          {socialLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
              aria-label={link.label}
            >
              <div className={css.iconWrapper}>{link.icon}</div>
              <span className={css.linkText}>{link.label}</span>
            </Link>
          ))}
        </div>
        <Image
          className={css.imageBack}
          src="/image/social/podcast.png"
          alt="Code4308 Podcast"
          width={2400}
          height={660}
          sizes="(min-width: 1000px) 1200px, 100vw"
          quality={100}
        />
      </div>
    </section>
  );
}
