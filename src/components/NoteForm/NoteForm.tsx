import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { NoteTag } from "../../types/note";
import styles from "./NoteForm.module.css";

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов’язкове поле"),
  content: Yup.string().max(500, "Максимум 500 символів"),
  tag: Yup.string()
    .oneOf(
      ["Personal", "Work", "Todo", "Meeting", "Shopping"],
      "Неправильний тег"
    )
    .required("Оберіть тег"),
});

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onCancel: () => void;
}

const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel(); // закриває модалку
    },
  });

  const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "Personal",
  };

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Заголовок:</label>
          <Field name="title" className={styles.input} />
          <ErrorMessage name="title" component="div" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Контент:</label>
          <Field
            name="content"
            as="textarea"
            className={styles.textarea}
            rows={6}
          />
          <ErrorMessage
            name="content"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tag">Тег:</label>
          <Field name="tag" as="select" className={styles.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={styles.error} />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Скасувати
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Завантаження..." : "Створити"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
