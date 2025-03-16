/**
 * @file Specialities Editor Component
 * @description This file defines the SpecialitiesEditor component that allows users to edit their specialities section.
 */

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import RevalidatePage from "@/services/portfolioUpdates/revalidatePage";
import ModalBtn from "../modal/components/modalBtn";
import ThemeSelector from "../modal/components/themeSelector";
import SubmitBtn from "../modal/components/submitBtn";
import EditModal from "../modal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconSelector from "../modal/components/iconSelector";
import { UpdateSpecialities } from "@/services/portfolioUpdates/updateSpecialities";
import SectionItems from "../modal/components/sectionItems";

type SpecialitiesEditorProps = {
  userIdProp: number;
  orderProp: number;
  themeProp: string;
  titleProp: string;
  descriptionProp: string;
  specialitiesProp: Speciality[];
};

type Speciality = {
  title: string;
  description: string;
  icon: string;
};

/**
 * SpecialitiesEditor component that allows users to edit their specialities section.
 * This component handles the specialities editing process and displays success or error messages.
 *
 * @param {SpecialitiesEditorProps} props - The component's props containing specialities data.
 * @returns {JSX.Element} The rendered JSX for the SpecialitiesEditor component.
 */
export default function SpecialitiesEditor({
  userIdProp,
  orderProp,
  themeProp,
  titleProp,
  descriptionProp,
  specialitiesProp,
}: SpecialitiesEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeProp);
  const [title, setTitle] = useState(titleProp);
  const [description, setDescription] = useState(descriptionProp);
  const [order, setOrder] = useState(orderProp);
  const [specialities, setSpecialities] = useState(specialitiesProp);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  /**
   * Handles the form submission to update the specialities section.
   * Makes a POST request to the backend API to update the specialities section.
   * Updates the UI based on success or failure.
   * @param {FormData} formData - The form data to update the specialities section.
   * @returns {Promise<void>} The success status of the update.
   */
  const handleSubmit = async (formData: FormData) => {
    setErrors([]);
    setLoading(true);
    const results = await UpdateSpecialities(formData, userIdProp);
    if (results.success) {
      await RevalidatePage(pathname);
      setLoading(false);
      setIsOpen(false);
    } else {
      setLoading(false);
      setErrors(results.errors ?? []);
    }
  };

  /**
   * Handles the change in speciality data.
   * Updates the speciality data based on the field and value.
   * @param {number}
   * @param {"title" | "description" | "icon"} field - The field to update.
   * @param {string} value - The value to update.
   */
  const handleSpecialityChange = (
    index: number,
    field: "title" | "description" | "icon",
    value: string
  ) => {
    const updatedSpecialities = [...specialities];
    updatedSpecialities[index] = {
      ...updatedSpecialities[index],
      [field]: value,
    };
    setSpecialities(updatedSpecialities);
  };

  /**
   * Adds a new speciality to the specialities list
   * by adding an empty speciality object.
   */
  const addSpeciality = () => {
    setSpecialities([
      ...specialities,
      { title: "", description: "", icon: "" },
    ]);
  };

  /**
   * Removes a speciality from the specialities list
   * by filtering out the speciality at the given index.
   * @param {number} index - The index of the speciality to remove.
   * @returns {void} The success status of the removal.
   */
  const removeSpeciality = (index: number) => {
    setSpecialities(specialities.filter((_, i) => i !== index));
  };

  return (
    <>
      <ModalBtn
        setIsOpen={setIsOpen}
        btnText="Edit Specialities"
        iconProp="pen"
      />
      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Specialities"
      >
        <form
          className="form-container"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const extractedSpecialities: Speciality[] = [];
            specialities.forEach((_, index) => {
              const title = formData.get(
                `specialities[${index}][title]`
              ) as string;
              const description = formData.get(
                `specialities[${index}][description]`
              ) as string;
              const icon = formData.get(
                `specialities[${index}][icon]`
              ) as string;

              if (title && description && icon) {
                extractedSpecialities.push({ title, description, icon });
              }
            });
            formData.append(
              "specialities",
              JSON.stringify(extractedSpecialities)
            );
            await handleSubmit(formData);
          }}
        >
          <SectionItems
            theme={theme}
            setTheme={setTheme}
            order={order}
            setOrder={setOrder}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />

          <div className="form-container">
            {specialities.map((speciality, index) => (
              <div
                key={index}
                className="socials-form-container edit-shadow-border"
              >
                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Speciality Title"}</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    className="text-input btn-text edit-shadow-border"
                    value={speciality.title}
                    onChange={(e) =>
                      handleSpecialityChange(index, "title", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="">{"Enter Speciality Description"}</label>
                  <textarea
                    id="description"
                    name="description"
                    className="text-input btn-text edit-shadow-border"
                    placeholder="Description"
                    value={speciality.description}
                    onChange={(e) =>
                      handleSpecialityChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                  />
                </div>

                <IconSelector
                  icon={speciality.icon}
                  setIcon={(icon) =>
                    handleSpecialityChange(index, "icon", icon)
                  }
                />

                <input
                  type="hidden"
                  name={`specialities[${index}][title]`}
                  value={speciality.title}
                />
                <input
                  type="hidden"
                  name={`specialities[${index}][description]`}
                  value={speciality.description}
                />
                <input
                  type="hidden"
                  name={`specialities[${index}][icon]`}
                  value={speciality.icon}
                />
                <button
                  type="button"
                  onClick={() => removeSpeciality(index)}
                  className="btn btn-text edit-shadow-border white-background edit-button-hover"
                >
                  {"Remove Speciality "}
                  <FontAwesomeIcon
                    icon={faTrash}
                    aria-hidden="true"
                    size="1x"
                  />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpeciality}
              className="btn btn-text edit-shadow-border white-background edit-button-hover"
            >
              {"Add Speciality "}
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" size="1x" />
            </button>
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
