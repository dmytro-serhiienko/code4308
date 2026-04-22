import Link from "next/link";
import css from "./Hero.module.css";
import Image from "next/image";

export function Hero() {
  return (
    <section className={css.hero}>
      {/* <div className={css.decor1} data-intro="hero-decor">
        4308
      </div>
      <div className={css.decor2} data-intro="hero-decor">
        4308
      </div> */}

      <div className={css.decor1} data-intro="hero-decor">
        <Image
          className={css.decorImage1}
          src="/4308.png"
          alt="Decor"
          width={1000}
          height={100}
        />
      </div>
      <div className={css.decor2} data-intro="hero-decor">
        <Image
          className={css.decorImage2}
          src="/4308.png"
          alt="Decor"
          width={1000}
          height={100}
        />
      </div>

      <div className={css.container}>
        <div className={css.textBlock}>
          <div className={css.heroText} data-intro="hero-text">
            Слухай.
          </div>
          <div className={css.heroText} data-intro="hero-text">
            Думай.
          </div>
          <div className={css.heroText} data-intro="hero-text">
            Дій.
          </div>
        </div>

        <div className={css.imageWrapper1} data-intro="hero-image">
          <div className={css.image1} aria-hidden="true" />
        </div>

        <div className={css.imageWrapper2} data-intro="hero-image">
          <div className={css.image2} aria-hidden="true" />
        </div>

        <div className={css.bottomActions}>
          <Link href="#about" className={css.pulseButton}>
            Дізнатись більше
          </Link>
        </div>
      </div>
    </section>
  );
}
