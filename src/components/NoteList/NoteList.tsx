import styles from "./NoteList.module.css";
import { useDeleteNoteMutation } from "../../hooks/useDeleteNoteMutation";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const deleteMutation = useDeleteNoteMutation();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button
              className={styles.button}
              onClick={() => handleDelete(note.id)}
            >
              Видалити
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
