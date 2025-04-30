/**
 * @file This file defines the section remover component.
 * @description This component defines a button that opens a modal to remove a section.
 */

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import ModalBtn from "../modal/components/modalBtn";
import SubmitBtn from "../modal/components/submitBtn";
import EditModal from "../modal/EditModal";
import { RemoveSection } from "@/services/portfolioUpdates/removeSection";
import { useRouter } from "next/navigation";
import { useSectionUpdate } from "../../dashboard/editors/sectionUpdateContext";

type SectionRemoverProps = {
  userIdProp: number;
  section: string;
};

/**
 * This function returns the section remover component.
 * @param {SectionRemoverProps} props - The props for the section remover component.
 * @returns {JSX.Element} The section remover component.
 */
export default function SectionRemover({
  userIdProp,
  section,
}: SectionRemoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter(); 
  const triggerUpdate = useSectionUpdate(); 

  /**
   * This function handles the form submission.
   * @param {FormData} formData - The form data to remove the section.
   * @returns {Promise<void>} The success status of the remove.
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await RemoveSection(formData, userIdProp);
    if (results.success) {
      await RevalidatePage(pathname);
      triggerUpdate();
      router.refresh();
      setLoading(false);
      setIsOpen(false);
    } else {
      setLoading(false);
      setErrors(results.errors ?? []);
    }
  };

  return (
    <>
      <ModalBtn
        setIsOpen={setIsOpen}
        btnText={`Remove ${section.charAt(0).toUpperCase() + section.slice(1)} Section From Portfolio`}
        iconProp="trash"
      />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Are you sure you want to remove the ${section} section?`}
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            await handleSubmit(formData);
          }}
        >
          <input type="hidden" name="section" value={section} />
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
