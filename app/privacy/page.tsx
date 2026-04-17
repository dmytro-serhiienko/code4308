import Link from "next/link";
import css from "./Privacy.module.css";

export default function PrivacyPage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <header className={css.header}>
          <h1 className={css.title}>Політика конфіденційності</h1>
        </header>

        <div className={css.content}>
          <section>
            <h2 className={css.sectionTitle}>1. Загальні положення</h2>
            <p className={css.text}>
              Ця Політика конфіденційності визначає порядок отримання,
              зберігання, обробки та використання персональних даних
              користувачів сайту CODE4308. Ми поважаємо ваше право на
              конфіденційність та зобов’язуємося захищати ваші персональні дані.
            </p>
          </section>

          <section>
            <h2 className={css.sectionTitle}>2. Збір даних</h2>
            <p className={css.text}>Ми можемо збирати наступну інформацію:</p>
            <ul className={css.list}>
              <li>Технічні дані про відвідування (IP-адреса, тип браузера);</li>
              <li>Файли cookies для покращення роботи інтерфейсу;</li>
              <li>
                Інформацію, яку ви добровільно надаєте через контактні форми.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={css.sectionTitle}>3. Використання інформації</h2>
            <p className={css.text}>
              Отримана інформація використовується виключно для аналітики
              відвідуваності, забезпечення коректної роботи сайту та зворотного
              зв’язку з користувачами щодо оновлень подкасту.
            </p>
          </section>

          <section>
            <h2 className={css.sectionTitle}>4. Захист даних</h2>
            <p className={css.text}>
              Ми вживаємо всіх необхідних технічних та організаційних заходів
              для захисту ваших даних від несанкціонованого доступу, зміни або
              видалення. Ваші дані не передаються третім особам без вашої згоди.
            </p>
          </section>
        </div>

        <footer className={css.footer}>
          <Link href="/" className={css.backLink}>
            ← Повернутися на головну
          </Link>
        </footer>
      </div>
    </main>
  );
}
