/**
 * @file Section appender component.
 * @description This file defines the component for adding a section to the portfolio.
 */

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import ModalBtn from "../modal/components/modalBtn";
import SubmitBtn from "../modal/components/submitBtn";
import EditModal from "../modal/EditModal";
import { getSections } from "../../../services/db/db";
import { AddSection } from "../../../services/portfolioUpdates/addSection";

type SectionAppenderProps = {
  userIdProp: number;
};

/**
 * This function returns the section appender component.
 * @param {number} userIdProp - The user ID to add the section for.
 * @returns {JSX.Element} The section appender component.
 */
export default function SectionAppender({ userIdProp }: SectionAppenderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sectionsToAppend, setSectionsToAppend] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const pathname = usePathname();

  /**
   * This function fetches the sections available to append.
   */
  useEffect(() => {
    const fetchSections = async () => {
      const sections: { [key: string]: boolean }[] = await getSections(
        userIdProp
      );
      const sectionsAvailable = Object.keys(sections[0] || {}).filter(
        (section) => sections[0][section] === false
      );
      setSectionsToAppend(sectionsAvailable);
    };

    fetchSections();
  }, [userIdProp, updateTrigger]);

  /**
   * This function handles the form submission.
   * @param {FormData} formData - The form data to add the section.
   * @returns {Promise<void>} The success status of the add.
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await AddSection(formData, userIdProp);
    if (results.success) {
      setUpdateTrigger((prev) => prev + 1);
      await RevalidatePage(pathname);
      setLoading(false);
      setIsOpen(false);
    } else {
      setLoading(false);
      setErrors(results.errors ?? []);
    }
  };

  /**
   * This function handles the section selection.
   * @param {string} section - The section to select.
   * @returns {void} The success status of the selection.
   */
  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <>
      <ModalBtn setIsOpen={setIsOpen} btnText="Add Section" iconProp="plus" />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Section"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            await handleSubmit(formData);
          }}
        >
          <div className="input-wrapper">
            <label htmlFor="section">{"Select a Section"}</label>
            <select
              name="section"
              id="section"
              aria-label="Section"
              className="text-input select-input edit-shadow-border btn-text white-background"
              onChange={(e) => handleSectionSelect(e.target.value)}
              value={selectedSection ?? ""}
            >
              <option value="" disabled>
                {"Select a Section"}
              </option>
              {sectionsToAppend.length > 0 ? (
                sectionsToAppend.map((section) => (
                  <option key={section} value={section}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {"No sections available"}
                </option>
              )}
            </select>
          </div>

          {errors.map((error) => (
            <p key={error} className="error-text">
              {error}
            </p>
          ))}
          <SubmitBtn loading={loading} />
        </form>
      </EditModal>
    </>
  );
}
