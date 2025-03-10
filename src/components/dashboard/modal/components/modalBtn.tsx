import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type ModalBtnProps = {
  setIsOpen: (isOpen: boolean) => void;
  btnText: string;
};

export default function ModalBtn({ setIsOpen, btnText }: ModalBtnProps) {
  return (
    <button className="edit-button" onClick={() => setIsOpen(true)}>
      <span className="edit-button-text">{btnText}</span>
      <FontAwesomeIcon icon={faPen} aria-hidden="true" size="1x" />
    </button>
  );
}
