import css from "./Contacts.module.css";
import { FaTelegram, FaEnvelope, FaPhone } from "react-icons/fa6";

export default function Contacts() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title} data-anim="fade-up">
          Контакти
        </h1>

        <div className={css.grid}>
          {/* Інфо частина */}
          <div className={css.info} data-anim="fade-left">
            <p className={css.text}>
              Маєш запитання чи пропозиції? Звʼяжись із нами будь-яким зручним
              способом.
            </p>

            <div className={css.contactList} data-anim="stagger">
              <a href="tel:+380000000000" className={css.contactItem}>
                <FaPhone className={css.icon} />
                <span>+38 (000) 000 00 00</span>
              </a>
              <a href="mailto:info@code4308.com" className={css.contactItem}>
                <FaEnvelope className={css.icon} />
                <span>info@code4308.com</span>
              </a>
              <a
                href="https://t.me/recruit4308"
                target="_blank"
                className={css.contactItem}
              >
                <FaTelegram className={css.icon} />
                <span>@recruit4308</span>
              </a>
            </div>
          </div>

          {/* Форма */}
          <form className={css.form} data-anim="fade-right">
            <div className={css.inputGroup}>
              <label htmlFor="name">Імʼя</label>
              <input type="text" id="name" placeholder="Твоє ім'я" required />
            </div>

            <div className={css.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className={css.inputGroup}>
              <label htmlFor="message">Повідомлення</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Твоє запитання..."
                required
              ></textarea>
            </div>

            <button type="submit" className={css.button}>
              Надіслати
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
