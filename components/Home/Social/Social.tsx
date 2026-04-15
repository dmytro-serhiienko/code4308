import Link from "next/link";
import { FaYoutube, FaSpotify } from "react-icons/fa6";
import css from "./Social.module.css";
import { AiFillInstagram } from "react-icons/ai";

import { FaTelegramPlane } from "react-icons/fa";

export function Social() {
  const socialLinks = [
    {
      id: 1,
      href: "https://www.instagram.com/hub.4308/",
      icon: <AiFillInstagram />,
    },
    {
      id: 2,
      href: "https://t.me/recruit4308?utm_source=yt4308&utm_medium=smm&utm_campaign=link&utm_term=7112024&utm_content=description",
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
  ];

  return (
    <section className={css.socialSection} id="about">
      <div className={css.container} data-anim="stagger">
        {socialLinks.map((link) => (
          <div key={link.id} className={css.iconWrapper}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={css.link}
            >
              {link.icon}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
