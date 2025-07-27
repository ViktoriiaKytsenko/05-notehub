import { useState } from "react";
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

  const { data, isLoading, isError } = useNotesQuery({
    page,
    search: debouncedSearch.trim() !== "" ? debouncedSearch : undefined,
  });

  const deleteMutation = useDeleteNoteMutation();

  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id);
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

      {data?.results && (
        <>
          <NoteList notes={data.results} onDelete={handleDeleteNote} />

          {data.total > 12 && (
            <Pagination
              pageCount={Math.ceil(data.total / 12)}
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
