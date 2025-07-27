import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      containerClassName={styles.pagination} // основний контейнер (ul)
      pageClassName={styles.pageItem} // звичайна сторінка (li)
      pageLinkClassName=""
      previousClassName={styles.pageItem}
      nextClassName={styles.pageItem}
      breakClassName={styles.pageItem}
      activeClassName={styles.active} // активна сторінка
      disabledClassName={styles.disabled} // неактивна стрілка
    />
  );
};

export default Pagination;
