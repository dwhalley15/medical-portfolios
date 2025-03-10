/**
 * @file Navigation editor component.
 * @description This component displays the navigation editor for the dashboard.
 */

"use client";

import { useState } from "react";
import EditModal from "../modal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPen } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import { UpdateNavigationTheme } from "@/services/portfolioUpdates/updateNavigationTheme";

type NavigationEditorProps = {
  userIdProp: number;
  themeProp: string;
};

/**
 * This function returns the navigation editor component.
 * @param {NavigationEditorProps} data - The data for the navigation editor component.
 * @returns {JSX.Element} The navigation editor component.
 */
export default function NavigationEditor({
  userIdProp,
  themeProp,
}: NavigationEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateNavigationTheme(formData, userIdProp);
    if (results.success) {
      await RevalidatePage(pathname);
      setLoading(false);
      setIsOpen(false);
    } else {
      setLoading(false);
      setErrors(results.errors ?? []);
    }
  };

  return (
    <>
      <button className="edit-button" onClick={() => setIsOpen(true)}>
        <span className="edit-button-text">{"Edit Navbar"}</span>
        <FontAwesomeIcon icon={faPen} aria-hidden="true" size="1x" />
      </button>
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Navbar"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            await handleSubmit(formData);
          }}
        >
          <select
            className="text-input select-input edit-shadow-border btn-text white-background"
            id="theme"
            name="theme"
            aria-label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="default">{"Blue Theme"}</option>
            <option value="default-inverted">{"Blue Theme Inverted"}</option>
          </select>

          {errors.map((error) => (
            <p key={error} className="error-text">
              {error}
            </p>
          ))}

          <button
            className="btn btn-text edit-shadow-border white-background"
            disabled={loading}
            type="submit"
            aria-label="Update"
            role="button"
          >
            {loading ? "Working..." : "Update"}
            <FontAwesomeIcon icon={faFloppyDisk} aria-hidden="true" size="2x" />
          </button>
        </form>
      </EditModal>
    </>
  );
}
