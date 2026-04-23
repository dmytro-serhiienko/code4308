"use client";

import { useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import Image from "next/image";
import { ReservModal } from "./ReservModal/ReservModal";
import css from "./Reserv.module.css";

export function Reserv() {
  const [open, setOpen] = useState(false);

  return (
    <section className={css.reserv}>
      <div className={css.decor1}>
        <Image
          className={css.decorImage1}
          src="/4308.png"
          alt="Decor"
          width={1000}
          height={100}
        />
      </div>
      <div className={css.decor2}>
        <Image
          className={css.decorImage2}
          src="/4308.png"
          alt="Decor"
          width={1000}
          height={100}
        />
      </div>

      <div className={css.container}>
        <div className={css.ctaBlock}>
          <h2 className={css.title}>Стань героєм нашого подкасту!</h2>
          <button
            type="button"
            className={css.mainBtn}
            onClick={() => setOpen(true)}
          >
            Записатись <FaMicrophoneAlt className={css.microIcon} />
          </button>
        </div>
      </div>

      {open && <ReservModal onClose={() => setOpen(false)} />}
    </section>
  );
}
