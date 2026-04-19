"use client";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import css from "./Reserv.module.css";

export function Reserv() {
  const [open, setOpen] = useState(false);

  return (
    <section className={css.reserv}>
      <div className={css.container}>
        <div className={css.ctaBlock}>
          <h2 className={css.title}>Стань героєм нашого подкасту</h2>
          <button
            type="button"
            className={css.mainBtn}
            onClick={() => setOpen(true)}
          >
            Записатись
          </button>
        </div>
      </div>

      {open && (
        <div className={css.modalOverlay}>
          <div className={css.modal}>
            <button className={css.closeBtn} onClick={() => setOpen(false)}>
              <IoCloseOutline />
            </button>

            <h3 className={css.modalTitle}>Анкета гостя</h3>

            <form className={css.form}>
              <label className={css.label}>
                Ім’я / Псевдонім
                <input
                  type="text"
                  className={css.input}
                  placeholder="ЯК ТЕБЕ ЗВАТИ?"
                />
              </label>

              <label className={css.label}>
                Телефон
                <input type="tel" className={css.input} placeholder="+380" />
              </label>

              <label className={css.label}>
                Тема, про яку хочеш поговорити
                <textarea
                  className={css.textarea}
                  placeholder="ПРО ЩО БУДЕМО ГОВОРИТИ?"
                />
              </label>

              <label className={css.label}>
                Посилання на соцмережі
                <input
                  type="text"
                  className={css.input}
                  placeholder="INSTAGRAM / FB / TWITTER"
                />
              </label>

              <button type="submit" className={css.submitBtn}>
                Відправити заявку
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
