import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import { ErrorMessage } from "@hookform/error-message";

interface NoteFormProps {
  onSuccess: () => void;
}

const TAG_OPTIONS: Note["tag"][] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),
  content: yup
    .string()
    .required("Content is required")
    .max(500, "Maximum 500 characters"),
  tag: yup
    .mixed<Note["tag"]>()
    .oneOf(TAG_OPTIONS, "Please select a valid tag")
    .required("Tag is required"),
});

type FormValues = yup.InferType<typeof schema>;

const NoteForm = ({ onSuccess }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title")} className={styles.input} />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }: { message: string }) => (
            <p className={styles.error}>{message}</p>
          )}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          {...register("content")}
          className={styles.textarea}
        />
        <ErrorMessage
          errors={errors}
          name="content"
          render={({ message }: { message: string }) => (
            <p className={styles.error}>{message}</p>
          )}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" {...register("tag")} className={styles.select}>
          <option value="">Select tag</option>
          {TAG_OPTIONS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name="tag"
          render={({ message }: { message: string }) => (
            <p className={styles.error}>{message}</p>
          )}
        />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onSuccess}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
