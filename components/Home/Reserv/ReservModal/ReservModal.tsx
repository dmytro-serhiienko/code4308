"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { Formik, Form, Field, useFormikContext, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import css from "./ReservModal.module.css";

interface FormikValues {
  name: string;
  phone: string;
  topic: string;
  socials: string;
}

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
    if (isSubmitting && !isValidating && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error as string, { id: error as string });
      });
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
}

export function ReservModal({ onClose }: { onClose: () => void }) {
  // useEffect для всього
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Закриття на Escape
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: "Відправка...",
      success: () => {
        onClose();
        actions.resetForm();
        return "Успішно!";
      },
      error: "Помилка",
    });
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} type="button">
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
              <FormErrorWatcher />
              <label className={css.label}>
                Ім’я / Псевдонім
                <Field
                  name="name"
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
                Тема
                <Field
                  as="textarea"
                  name="topic"
                  className={`${css.textarea} ${errors.topic && touched.topic ? css.inputError : ""}`}
                  placeholder="ПРО ЩО БУДЕМО ГОВОРИТИ?"
                />
              </label>

              <label className={css.label}>
                Соцмережі
                <Field
                  name="socials"
                  className={`${css.input} ${errors.socials && touched.socials ? css.inputError : ""}`}
                  placeholder="INSTAGRAM / FB"
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
    </div>,
    document.body,
  );
}
