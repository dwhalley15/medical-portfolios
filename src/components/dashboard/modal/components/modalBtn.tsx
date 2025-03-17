/**
 * @file This file defines the component for a modal button.
 * @description This component defines a button that opens a modal.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

type ModalBtnProps = {
  setIsOpen: (isOpen: boolean) => void;
  btnText: string;
  iconProp: string;
};

/**
 * This function returns the modal button component.
 * @param {ModalBtnProps} data - The data for the modal button component.
 * @returns {JSX.Element} The modal button component.
 */
export default function ModalBtn({
  setIsOpen,
  btnText,
  iconProp,
}: ModalBtnProps) {
  let icon;
  switch (iconProp) {
    case "pen":
      icon = faPen;
      break;
    case "plus":
      icon = faPlus;
      break;
    case "trash":
      icon = faTrash;
      break;
    default:
      icon = faPen;
  }

  return (
    <button className="edit-button" onClick={() => setIsOpen(true)}>
      <span className="edit-button-text">{btnText}</span>
      <FontAwesomeIcon icon={icon} aria-hidden="true" size="1x" />
    </button>
  );
}
