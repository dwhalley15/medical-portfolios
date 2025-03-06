"use client";

import { useState } from "react";
import EditModal from "../modal/EditModal";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { UpdateHeader } from "@/services/portfolioUpdates/updateHeader";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";

type HeaderEditorProps = {
  userIdProp: number;
  themeProp: string;
  nameProp: string;
  imageProp: string;
  descriptionProp: string;
};

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

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
      <button className="edit-button" onClick={() => setIsOpen(true)}>
        {"Edit Header"}
      </button>
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Header"
      >
        <form className="form-container" action={handleSubmit}>
          <select
            className="text-input select-input shadow-border btn-text"
            id="theme"
            name="theme"
            aria-label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="default">{"Blue Theme"}</option>
            <option value="default-inverted">{"Blue Theme Inverted"}</option>
          </select>

          <Image
            src={imagePreview}
            alt={name}
            width={100}
            height={100}
            priority
            quality={100}
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

          <input
            className="text-input btn-text shadow-border"
            type="text"
            id="name"
            name="name"
            aria-label="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            id="description"
            name="description"
            className="text-input btn-text shadow-border"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />

          {errors.map((error) => (
            <p key={error} className="error-text">
              {error}
            </p>
          ))}

          <button
            className="btn btn-text shadow-border"
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
