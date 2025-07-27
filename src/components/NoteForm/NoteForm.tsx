import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateNoteMutation } from "../../hooks/useCreateNoteMutation";
import styles from "./NoteForm.module.css";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Обов’язкове поле"),
  content: Yup.string().required("Обов’язкове поле"),
  tag: Yup.string()
    .oneOf(["Personal", "Work", "Todo"], "Неправильний тег")
    .required("Оберіть тег"),
});

interface FormValues {
  title: string;
  content: string;
  tag: "Personal" | "Work" | "Todo";
}

interface NoteFormProps {
  onSuccess: () => void;
}

const NoteForm = ({ onSuccess }: NoteFormProps) => {
  const mutation = useCreateNoteMutation();

  const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "Personal",
  };

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values, { onSuccess });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label>
          Заголовок:
          <Field name="title" />
          <ErrorMessage name="title" component="div" className={styles.error} />
        </label>

        <label>
          Контент:
          <Field name="content" as="textarea" />
          <ErrorMessage
            name="content"
            component="div"
            className={styles.error}
          />
        </label>

        <label>
          Тег:
          <Field name="tag" as="select">
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Todo">Todo</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={styles.error} />
        </label>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Завантаження..." : "Створити"}
        </button>
      </Form>
    </Formik>
  );
};

export default NoteForm;
