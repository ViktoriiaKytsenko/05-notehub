import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNotesQuery } from "../../hooks/useNotesQuery";
import { useDeleteNoteMutation } from "../../hooks/useDeleteNoteMutation";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./App.module.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteMutation = useDeleteNoteMutation();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useNotesQuery({
    page,
    search: debouncedSearch.trim() !== "" ? debouncedSearch : undefined,
  });

  const handleDeleteNote = (id: number) => {
    deleteMutation.mutate(id); // ✅ Тепер передаємо число, як очікує хук
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.createButton}
        >
          Створити нотатку
        </button>
      </header>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка при завантаженні нотаток</p>}

      {data?.notes && (
        <>
          <NoteList notes={data.notes} onDelete={handleDeleteNote} />

          {data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
