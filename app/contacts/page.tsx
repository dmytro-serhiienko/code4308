"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FaTelegram, FaEnvelope, FaPhone } from "react-icons/fa6";
import { Formik, Form, Field, useFormikContext, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import css from "./Contacts.module.css";

// Типізація полів форми
interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

// Схема валідації
const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, "Ім'я надто коротке").required("Вкажіть ваше ім'я"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  message: Yup.string()
    .min(10, "Повідомлення має бути хоча б 10 символів")
    .required("Напишіть ваше повідомлення"),
});

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

function FormErrorWatcher() {
  const { errors, isSubmitting, isValidating } =
    useFormikContext<ContactFormValues>();

  useEffect(() => {
    if (isSubmitting && !isValidating && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error as string, {
          id: error as string, // уникаємо дублікатів
        });
      });
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
}

export default function Contacts() {
  const handleSubmit = async (
    values: ContactFormValues,
    actions: FormikHelpers<ContactFormValues>,
  ) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: "Відправка повідомлення...",
      success: () => {
        actions.resetForm();
        return "Повідомлення надіслано! Ми зв'яжемося з вами.";
      },
      error: "Помилка при відправці. Спробуйте пізніше.",
    });
  };

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
              Маєш запитання чи пропозиції?
              <br /> Звʼяжись із нами будь-яким зручним способом.
            </p>

            <div className={css.contactList} data-anim="stagger">
              <Link href="tel:+380000000000" className={css.contactItem}>
                <FaPhone className={css.icon} />
                <span>+38 (000) 000 00 00</span>
              </Link>
              <Link href="mailto:info@code4308.com" className={css.contactItem}>
                <FaEnvelope className={css.icon} />
                <span>info@code4308.com</span>
              </Link>
              <Link
                href="https://t.me/recruit4308"
                target="_blank"
                className={css.contactItem}
              >
                <FaTelegram className={css.icon} />
                <span>@recruit4308</span>
              </Link>
            </div>
          </div>

          {/* Formik */}
          <Formik
            initialValues={initialValues}
            validationSchema={ContactSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={css.form} data-anim="fade-right">
                <FormErrorWatcher />

                <div className={css.inputGroup}>
                  <label htmlFor="name">Імʼя</label>
                  <Field
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Твоє ім'я"
                    className={`${css.inputForm} ${errors.name && touched.name ? css.inputError : ""}`}
                  />
                </div>

                <div className={css.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    className={`${css.inputForm} ${errors.email && touched.email ? css.inputError : ""}`}
                  />
                </div>

                <div className={css.inputGroup}>
                  <label htmlFor="message">Повідомлення</label>
                  <Field
                    name="message"
                    as="textarea"
                    id="message"
                    rows={5}
                    placeholder="Твоє запитання..."
                    className={`${css.inputForm} ${css.textarea} ${errors.message && touched.message ? css.inputError : ""}`}
                  />
                </div>

                <button
                  type="submit"
                  className={css.button}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Надсилання..." : "Надіслати"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
