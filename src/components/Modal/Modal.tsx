import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  // Закриття по Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Заборона скролу

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Відновлення скролу
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>{children}</div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
