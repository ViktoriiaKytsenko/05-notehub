import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h3 className={styles.title}>{note.title}</h3>
          {note.content && <p className={styles.content}>{note.content}</p>}
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button className={styles.button} onClick={() => onDelete(note.id)}>
              Видалити
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
