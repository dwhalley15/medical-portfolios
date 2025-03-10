import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SubmitBtnProps = {
  loading: boolean;
};

export default function SubmitBtn({ loading }: SubmitBtnProps) {
  return (
    <button
      className="btn btn-text edit-shadow-border white-background edit-button-hover"
      disabled={loading}
      type="submit"
      aria-label="Update"
      role="button"
    >
      {loading ? "Working..." : "Update"}
      <FontAwesomeIcon icon={faFloppyDisk} aria-hidden="true" size="2x" />
    </button>
  );
}
