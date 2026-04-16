import Link from "next/link";
import Image from "next/image";
import css from "./Dmytro.module.css";

export default function DmytroPage() {
  return (
    <main className={css.main}>
      {/* <div className={css.imgWrapper}>
        <Image
          className={css.imgBack}
          src="/image/person/dimko.png"
          alt="Dmytro background"
          width={2400}
          height={660}
          sizes="(min-width: 1000px) 1200px, 100vw"
          quality={100}
        />
      </div> */}
      <article className={css.container}>
        <header className={css.header}>
          <span className={css.subtitle}>Ведучий подкасту CODE4308</span>
          <h1 className={css.title}>Дмитро Грекович: Шлях від IT до «Азову»</h1>
        </header>

        <div className={css.content}>
          <p className={css.paragraph}>
            Життя Дмитра — це приклад того, як цивільні навички та
            професіоналізм стають фундаментом для захисту країни. До
            повномасштабного вторгнення він будував успішну карʼєру в маркетингу
            та IT, працюючи Project Manager у великій продуктовій компанії,
            орієнтованій на західні ринки. Його щоденною роботою було управління
            складними процесами, командами та досягнення результатів.
          </p>

          <p className={css.paragraph}>
            Проте 2022 рік змінив пріоритети. Після року активного волонтерства,
            поїздок на деокуповану Херсонщину та допомоги фронту, Дмитро прийняв
            свідоме рішення — стати частиною 12-ї бригади спеціального
            призначення «Азов» НГУ.
          </p>

          <div className={css.accent}>
            Чому саме «Азов»? Для Дмитра це вибір «найкращої компанії». Як у
            цивільному житті ми прагнемо працювати у Google чи Netflix через
            їхні стандарти та якість, так і у війську Дмитро обрав підрозділ, де
            панує професіоналізм та братерство.
          </div>

          <p className={css.paragraph}>
            Сьогодні він використовує свій менеджерський досвід для того, щоб
            бойовий механізм бригади працював ще ефективніше, а ворог зникав з
            нашої землі.
          </p>
        </div>

        <Link href="/" className={css.backLink}>
          ← Повернутися
        </Link>
      </article>
    </main>
  );
}
