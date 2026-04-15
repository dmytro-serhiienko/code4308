import Link from "next/link";
import css from "./Hero.module.css";

export function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.decor}>4308</div>
      <div className={css.container}>
        <div className={css.textBlock}>
          <div className={css.heroText}>Слухай.</div>
          <div className={css.heroText}>Думай.</div>
          <div className={css.heroText}>Дій.</div>
        </div>

        <div className={css.imageWrapper} data-intro="hero-image">
          <div className={css.image} aria-hidden="true" />
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
