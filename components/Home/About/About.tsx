import Image from "next/image";
import { IoLogoInstagram } from "react-icons/io";
import css from "./About.module.css";
import Link from "next/link";

export function About() {
  return (
    <section className={css.about}>
      <div className={css.container}>
        <div className={css.header} data-anim="fade-left">
          <h2 className={css.label}>Про проєкт</h2>
        </div>

        <div className={css.infoGrid}>
          <div className={css.description} data-anim="fade-up">
            <p>
              Це подкаст про людей, які формують нову реальність України. Ми
              говоримо з тими, хто вже сьогодні будує країну в освіті, культурі
              та суспільстві.
            </p>
          </div>

          <div className={css.hosts} data-anim="stagger">
            <div className={css.hostItem}>
              <Link
                href="https://www.instagram.com/dimko_grekovich/"
                target="_blank"
                rel="noopener noreferrer"
                className={css.hostLink}
              >
                <p className={css.hostName}>Дмитро «Ґвар» Грекович</p>
                <IoLogoInstagram className={css.instagramIcon} />
              </Link>
              <p className={css.hostRank}>
                молодший сержант 1-го корпусу «Азов»
              </p>
            </div>

            <div className={css.hostItem}>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={css.hostLink}
              >
                <p className={css.hostName}>Кирило «Масло» Масалітін</p>
                <IoLogoInstagram className={css.instagramIcon} />
              </Link>
            </div>
          </div>
        </div>

        <div className={css.footerQuote} data-anim="fade-up">
          <blockquote className={css.quote}>
            Ми віримо, що розмови мають силу. <br />І що нова Україна
            починається з кожного з нас.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
