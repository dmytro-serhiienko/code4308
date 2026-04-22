"use client";
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
import { Formik, Form, Field, useFormikContext, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import css from "./Reserv.module.css";

interface FormikValues {
  name: string;
  phone: string;
  topic: string;
  socials: string;
}

// Схема валідації Yup
const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(2, "Надто коротке ім'я").required("Ім'я обов'язкове"),
  phone: Yup.string()
    .matches(/^[0-9+()-\s]*$/, "Недопустимі символи")
    .min(7, "Номер надто короткий")
    .max(18, "Номер надто довгий")
    .required("Телефон обов'язковий"),
  topic: Yup.string()
    .min(10, "Опишіть тему детальніше (мін. 10 символів)")
    .required("Тема обов'язкова"),
  socials: Yup.string(),
});

const initialValues: FormikValues = {
  name: "",
  phone: "",
  topic: "",
  socials: "",
};

function FormErrorWatcher() {
  const { errors, isSubmitting, isValidating } =
    useFormikContext<FormikValues>();

  useEffect(() => {
    // Виводимо тости тільки при спробі сабміту
    if (isSubmitting && !isValidating && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error as string, {
          id: error as string,
        });
      });
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
}

export function Reserv() {
  const [open, setOpen] = useState(false);

  // Використовуємо FormikHelpers
  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: "Відправка вашої заявки...",
      success: () => {
        setOpen(false);
        actions.resetForm();
        return "Заявку успішно відправлено!";
      },
      error: "Сталася помилка при відправці.",
    });
  };

  return (
    <section className={css.reserv}>
      <div className={css.decor1} data-intro="hero-decor">
        4308
      </div>
      <div className={css.decor2} data-intro="hero-decor">
        4308
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

      {open && (
        <div className={css.modalOverlay}>
          <div className={css.modal}>
            <button className={css.closeBtn} onClick={() => setOpen(false)}>
              <IoCloseOutline />
            </button>

            <h3 className={css.modalTitle}>Анкета гостя</h3>

            <Formik
              initialValues={initialValues}
              validationSchema={FeedbackSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className={css.form}>
                  {/* Контролер, що виводить помилки в тости */}
                  <FormErrorWatcher />

                  <label className={css.label}>
                    Ім’я / Псевдонім
                    <Field
                      name="name"
                      type="text"
                      className={`${css.input} ${errors.name && touched.name ? css.inputError : ""}`}
                      placeholder="ЯК ТЕБЕ ЗВАТИ?"
                    />
                  </label>

                  <label className={css.label}>
                    Телефон
                    <Field
                      name="phone"
                      type="tel"
                      className={`${css.input} ${errors.phone && touched.phone ? css.inputError : ""}`}
                      placeholder="+380"
                    />
                  </label>

                  <label className={css.label}>
                    Тема, про яку хочеш поговорити
                    <Field
                      as="textarea"
                      name="topic"
                      className={`${css.textarea} ${errors.topic && touched.topic ? css.inputError : ""}`}
                      placeholder="ПРО ЩО БУДЕМО ГОВОРИТИ?"
                    />
                  </label>

                  <label className={css.label}>
                    Посилання на соцмережі
                    <Field
                      name="socials"
                      type="text"
                      className={`${css.input} ${errors.socials && touched.socials ? css.inputError : ""}`}
                      placeholder="INSTAGRAM / FB / TWITTER"
                    />
                  </label>

                  <button
                    type="submit"
                    className={css.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Відправка..." : "Відправити заявку"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </section>
  );
}
