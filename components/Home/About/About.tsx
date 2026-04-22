import { IoLogoInstagram } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import css from "./About.module.css";
import Link from "next/link";

export function About() {
  return (
    <section className={css.about} id="about">
      <div className={css.container}>
        <div className={css.header} data-anim="fade-left">
          <h2 className={css.label}>Про проєкт</h2>
        </div>

        <div className={css.infoGrid}>
          <div className={css.description} data-anim="fade-up">
            <p>
              Розмови для людей, які формують нову реальність України. Ми
              спілкуємось з тими, хто вже сьогодні будує країну в освіті,
              економіці, культурі та суспільстві.
            </p>
          </div>

          <div className={css.hosts} data-anim="stagger">
            {/* Діма */}
            <div className={css.hostItem}>
              <div className={css.hostImageWrapper}>
                <p className={css.hostName}>Дмитро «Ґвар» Грекович</p>

                <Link
                  href="https://www.instagram.com/dimko_grekovich/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.hostLink}
                >
                  <IoLogoInstagram className={css.instagramIcon} />
                </Link>
              </div>
              <p className={css.hostRank}>
                старший сержант 1-го корпусу «Азов»
              </p>

              <Link href="/dmytro" className={css.personaLink}>
                ОСОБИСТИЙ ШЛЯХ <MdArrowOutward className={css.arrowIcon} />
              </Link>
            </div>

            {/* Кирило */}
            <div className={css.hostItem}>
              <div className={css.hostImageWrapper}>
                <p className={css.hostName}>Кирило «Масло» Масалітін</p>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.hostLink}
                >
                  <IoLogoInstagram className={css.instagramIcon} />
                </Link>
              </div>
              <p className={css.hostRank}>
                головний сержант 1-го корпусу НГУ «Азов»
              </p>
              <Link href="/kyrylo" className={css.personaLink}>
                ОСОБИСТИЙ ШЛЯХ <MdArrowOutward className={css.arrowIcon} />
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
