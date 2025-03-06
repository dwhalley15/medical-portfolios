import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function EditModal({
  isOpen,
  onClose,
  title,
  children,
}: EditModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-content-container" ref={modalRef}>
        <h2>{title}</h2>
        <div>{children}</div>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faX} size="1x" />
        </button>
      </div>
    </div>
  );
}
