/**
 * @file Header editor component.
 * @description This component allows users to edit the header of their portfolio.
 */

"use client";

import { useState } from "react";
import EditModal from "../modal/EditModal";
import Image from "next/image";
import { UpdateHeader } from "@/services/portfolioUpdates/updateHeader";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import ModalBtn from "../modal/components/modalBtn";
import ThemeSelector from "../modal/components/themeSelector";
import SubmitBtn from "../modal/components/submitBtn";

type HeaderEditorProps = {
  userIdProp: number;
  themeProp: string;
  nameProp: string;
  imageProp: string;
  descriptionProp: string;
};

/**
 * This function returns the header editor component.
 * @param {HeaderEditorProps} data - The data for the header editor component.
 * @returns {JSX.Element} The header editor component.
 */
export default function HeaderEditor({
  userIdProp,
  themeProp,
  nameProp,
  imageProp,
  descriptionProp,
}: HeaderEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [name, setName] = useState(nameProp);
  const [imagePreview, setImagePreview] = useState<string>(imageProp);
  const [description, setDescription] = useState(descriptionProp);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  /**
   * This function handles the file change event.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   * @returns {void} Nothing.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  /**
   * This function handles the form submission.
   * @param {FormData}
   * @returns {void} Nothing.
   * @async
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateHeader(formData, userIdProp);
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
      <ModalBtn setIsOpen={setIsOpen} btnText="Edit Portfolio Header" iconProp="pen" />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Header"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            await handleSubmit(formData);
          }}
        >
          <ThemeSelector theme={theme} setTheme={setTheme} />

          <Image
            src={imagePreview}
            alt={name}
            width={100}
            height={100}
            priority
            quality={100}
            className="preview-image"
          />

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            aria-label="Image"
            className="btn-text"
          />

          <input type="hidden" name="original-image" value={imageProp} />

          <div className="input-wrapper">
            <label htmlFor="name">{"Enter Name or Title"}</label>
            <input
              className="text-input btn-text edit-shadow-border"
              type="text"
              id="name"
              name="name"
              aria-label="Name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="name">{"Enter Description"}</label>
            <textarea
              id="description"
              name="description"
              className="text-input btn-text edit-shadow-border"
              aria-label="Description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
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
