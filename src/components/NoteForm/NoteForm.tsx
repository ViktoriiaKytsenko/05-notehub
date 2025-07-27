import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import styles from "./NoteForm.module.css";

type FormData = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

type NoteFormProps = {
  onSuccess: () => void;
};

const schema = yup.object().shape({
  title: yup.string().required("Поле обов'язкове"),
  content: yup.string().required("Поле обов'язкове"),
  tag: yup
    .string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

const NoteForm = ({ onSuccess }: NoteFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      reset();
      onSuccess();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Заголовок</label>
        <input id="title" {...register("title")} className={styles.input} />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Зміст</label>
        <textarea
          id="content"
          {...register("content")}
          className={styles.textarea}
        />
        {errors.content && (
          <p className={styles.error}>{errors.content.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Тег</label>
        <select id="tag" {...register("tag")} className={styles.select}>
          <option value="">Виберіть тег</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <p className={styles.error}>{errors.tag.message}</p>}
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Створити
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
